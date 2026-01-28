---
domain: dev
type: definition
topics:
  - "[[java]]"
  - "[[spring]]"
  - "[[authentication]]"
status: evergreen
---
## Claim

> In Spring, `Authentication` is not "the user".
> It is a **key + context** object that answers three questions:
> - Who is acting ? (`principal`)
> - How are they authenticating ? (`credentials`,`authorities`)
> - Are they authenticated ? (`isAuthenticated()`)
> 
> Formally, `Authentication` represents the currently executing security context

In OAuth2 Client it is used as a lookup key, not as an identity in the human sense.

---
## Explanation
For a logged-in user:
```java
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
```

That `Authentication`:

- represents a human user
- is an `OAuth2AuthenticationToken`
- has a username, authorities, etc.

Spring uses:
```arduino
(clientRegistrationId = "google", principal = "alice")
```
to cache Alice’s token.

When we want `Authentication`  to represent the system, there is:
- ❌ no user
- ❌ no HTTP request
- ❌ no SecurityContext

But Spring **still needs a principal key**.
So we must give it **a synthetic principal**.
```java
private static Authentication systemPrincipal() {  
  return new AnonymousAuthenticationToken(  
      "sovos-scheduler",  
      "sovos-scheduler",  
      AuthorityUtils.createAuthorityList("ROLE_SYSTEM"));  
}
```

With this, we are saying:
> “This OAuth2 client_credentials request is executed by **the system**, not a user.”

---
## Implications

---
## Related
- [[INV-9871 Refactor Sovos WebClient auth to use Spring OAuth and RestTemplate]]
