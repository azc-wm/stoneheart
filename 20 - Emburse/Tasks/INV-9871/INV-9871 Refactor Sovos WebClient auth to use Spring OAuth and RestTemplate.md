## Objective

Have spring manage oauth so we do not have to use reactive webclients for sovos integration calls.


## Current code analysis.

### Oauth management

```java
ServletOAuth2AuthorizedClientExchangeFilterFunction oauth2Client =  
    new ServletOAuth2AuthorizedClientExchangeFilterFunction(authorizedClientManager);  
oauth2Client.setDefaultClientRegistrationId("sovos-service-client");
```

This is a `WebClientFilter`that can:
- Obtain an access token through the `OAuth2AuthroizedClientManager`
- Adds it as a Bearer Token in the outgoing request's. `Authorization` Header
- Potentially reuse/cached authorized clients depending on the manager's setup and storage

Spring docs:
- [Filter function](https://docs.spring.io/spring-security/reference/api/java/org/springframework/security/oauth2/client/web/reactive/function/client/ServletOAuth2AuthorizedClientExchangeFilterFunction.html?utm_source=chatgpt.com)
- [What `Oauth2AuthorizedClientManager` is responsible for](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/oauth2/client/OAuth2AuthorizedClientManager.html?utm_source=chatgpt.com)
- [“Authorized Client” concepts and how the manager is normally used](https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html?utm_source=chatgpt.com)
  
#### Nuances
The constructor behavior of `ServletOAuth2AuthorizedClientExchangeFilterFunction` has historically been nuanced around how it handles downstream 401/403 token failures and whether it removes invalid cached clients. [The Javadoc calls this out.  ](https://docs.spring.io/spring-security/reference/api/java/org/springframework/security/oauth2/client/web/reactive/function/client/ServletOAuth2AuthorizedClientExchangeFilterFunction.html?utm_source=chatgpt.com)
This ties directly to “predictable behavior” and avoiding repeated failures with a bad token.

### Understanding the issue

We are facing recurring `DataBufferLimitException`. What is it ?

> Spring WebFlux [limits](https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/web-reactive.html#webflux-codecs-limits) buffering of data in-memory in codec to avoid application memory issues. **By default, this is configured to 262,144 bytes**. When this isn’t enough for our use case, we’ll end up with the _DataBufferLimitException_.

The `/v1/notifications` endpoint can return very large XML payloads. Our current implementation ends up **aggregating the full response body in memory**, which can trigger `DataBufferLimitException` and creates memory/GC pressure.

While WebClient supports streaming, our current decoding path behaves like “read-all-then-process”. A streaming approach (processing chunks or streaming to disk/InputStream + streaming XML parsing) would avoid holding the full payload in memory.

In parallel, we will **decouple OAuth token acquisition from the notification request flow** by using Spring OAuth2 explicitly (via an interceptor/authorized client manager) and attaching the Bearer token to requests. This improves predictability, observability, and error handling for scheduled service-to-service calls.
Current memory usage looks like this:
![[Pasted image 20260122121248.png]]

Dev follows same pattern
![[Pasted image 20260122121532.png]]

### Current attemtpted solution