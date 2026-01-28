IAM Role is currently failing on startup

## First issue

invoice-app, as many other services, didn't have the needed version for IAM roles with sdk. Had to bump aws-sdk version to `1.12.+`

### Logs
```bash
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'invoiceAppController': Injection of resource dependencies failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'appService': Injection of resource dependencies failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'invoiceAppSnsService': Invocation of init method failed; nested exception is com.amazonaws.SdkClientException: Unable to load AWS credentials from any provider in the chain: [EnvironmentVariableCredentialsProvider: Unable to load AWS credentials from environment variables (AWS_ACCESS_KEY_ID (or AWS_ACCESS_KEY) and AWS_SECRET_KEY (or AWS_SECRET_ACCESS_KEY)), SystemPropertiesCredentialsProvider: Unable to load AWS credentials from Java system properties (aws.accessKeyId and aws.secretKey), com.amazonaws.auth.profile.ProfileCredentialsProvider@1b5860fb: profile file cannot be null, com.amazonaws.auth.EC2ContainerCredentialsProviderWrapper@1fab1909: The full URI (http://169.254.170.23/v1/credentials) contained withing environment variable AWS_CONTAINER_CREDENTIALS_FULL_URI has an invalid host. Host can only be one of [localhost, 127.0.0.1]]
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.postProcessProperties(CommonAnnotationBeanPostProcessor.java:332)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1431)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:619)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:542)
at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335)
at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333)
at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208)
at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:955)
at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:918)
at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:583)
at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:142)
at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:775)
at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:397)
at org.springframework.boot.SpringApplication.run(SpringApplication.java:316)
at org.springframework.boot.SpringApplication.run(SpringApplication.java:1260)
at com.chromeriver.micro.invoiceapp.InvoiceAppBootService.main(InvoiceAppBootService.java:21)
at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
at java.base/java.lang.reflect.Method.invoke(Method.java:566)
at org.springframework.boot.loader.MainMethodRunner.run(MainMethodRunner.java:49)
at org.springframework.boot.loader.Launcher.launch(Launcher.java:108)
at org.springframework.boot.loader.Launcher.launch(Launcher.java:58)
at org.springframework.boot.loader.JarLauncher.main(JarLauncher.java:65)
Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'appService': Injection of resource dependencies failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'invoiceAppSnsService': Invocation of init method failed; nested exception is com.amazonaws.SdkClientException: Unable to load AWS credentials from any provider in the chain: [EnvironmentVariableCredentialsProvider: Unable to load AWS credentials from environment variables (AWS_ACCESS_KEY_ID (or AWS_ACCESS_KEY) and AWS_SECRET_KEY (or AWS_SECRET_ACCESS_KEY)), SystemPropertiesCredentialsProvider: Unable to load AWS credentials from Java system properties (aws.accessKeyId and aws.secretKey), com.amazonaws.auth.profile.ProfileCredentialsProvider@1b5860fb: profile file cannot be null, com.amazonaws.auth.EC2ContainerCredentialsProviderWrapper@1fab1909: The full URI (http://169.254.170.23/v1/credentials) contained withing environment variable AWS_CONTAINER_CREDENTIALS_FULL_URI has an invalid host. Host can only be one of [localhost, 127.0.0.1]]
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.postProcessProperties(CommonAnnotationBeanPostProcessor.java:332)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.populateBean(AbstractAutowireCapableBeanFactory.java:1431)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:619)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:542)
at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335)
at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333)
at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208)
at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:276)
at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1391)
at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1311)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.autowireResource(CommonAnnotationBeanPostProcessor.java:544)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.getResource(CommonAnnotationBeanPostProcessor.java:520)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor$ResourceElement.getResourceToInject(CommonAnnotationBeanPostProcessor.java:673)
at org.springframework.beans.factory.annotation.InjectionMetadata$InjectedElement.inject(InjectionMetadata.java:228)
at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:119)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.postProcessProperties(CommonAnnotationBeanPostProcessor.java:329)
... 24 common frames omitted
Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'invoiceAppSnsService': Invocation of init method failed; nested exception is com.amazonaws.SdkClientException: Unable to load AWS credentials from any provider in the chain: [EnvironmentVariableCredentialsProvider: Unable to load AWS credentials from environment variables (AWS_ACCESS_KEY_ID (or AWS_ACCESS_KEY) and AWS_SECRET_KEY (or AWS_SECRET_ACCESS_KEY)), SystemPropertiesCredentialsProvider: Unable to load AWS credentials from Java system properties (aws.accessKeyId and aws.secretKey), com.amazonaws.auth.profile.ProfileCredentialsProvider@1b5860fb: profile file cannot be null, com.amazonaws.auth.EC2ContainerCredentialsProviderWrapper@1fab1909: The full URI (http://169.254.170.23/v1/credentials) contained withing environment variable AWS_CONTAINER_CREDENTIALS_FULL_URI has an invalid host. Host can only be one of [localhost, 127.0.0.1]]
at org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor.postProcessBeforeInitialization(InitDestroyAnnotationBeanPostProcessor.java:160)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.applyBeanPostProcessorsBeforeInitialization(AbstractAutowireCapableBeanFactory.java:440)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1796)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:620)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:542)
at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335)
at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333)
at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:213)
at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.resolveBeanByName(AbstractAutowireCapableBeanFactory.java:479)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.autowireResource(CommonAnnotationBeanPostProcessor.java:550)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.getResource(CommonAnnotationBeanPostProcessor.java:520)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor$ResourceElement.getResourceToInject(CommonAnnotationBeanPostProcessor.java:673)
at org.springframework.beans.factory.annotation.InjectionMetadata$InjectedElement.inject(InjectionMetadata.java:228)
at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:119)
at org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.postProcessProperties(CommonAnnotationBeanPostProcessor.java:329)
... 40 common frames omitted
Caused by: com.amazonaws.SdkClientException: Unable to load AWS credentials from any provider in the chain: [EnvironmentVariableCredentialsProvider: Unable to load AWS credentials from environment variables (AWS_ACCESS_KEY_ID (or AWS_ACCESS_KEY) and AWS_SECRET_KEY (or AWS_SECRET_ACCESS_KEY)), SystemPropertiesCredentialsProvider: Unable to load AWS credentials from Java system properties (aws.accessKeyId and aws.secretKey), com.amazonaws.auth.profile.ProfileCredentialsProvider@1b5860fb: profile file cannot be null, com.amazonaws.auth.EC2ContainerCredentialsProviderWrapper@1fab1909: The full URI (http://169.254.170.23/v1/credentials) contained withing environment variable AWS_CONTAINER_CREDENTIALS_FULL_URI has an invalid host. Host can only be one of [localhost, 127.0.0.1]]
at com.amazonaws.auth.AWSCredentialsProviderChain.getCredentials(AWSCredentialsProviderChain.java:136)
at com.amazonaws.http.AmazonHttpClient$RequestExecutor.getCredentialsFromContext(AmazonHttpClient.java:1164)
at com.amazonaws.http.AmazonHttpClient$RequestExecutor.runBeforeRequestHandlers(AmazonHttpClient.java:762)
at com.amazonaws.http.AmazonHttpClient$RequestExecutor.doExecute(AmazonHttpClient.java:724)
at com.amazonaws.http.AmazonHttpClient$RequestExecutor.executeWithTimer(AmazonHttpClient.java:717)
at com.amazonaws.http.AmazonHttpClient$RequestExecutor.execute(AmazonHttpClient.java:699)
at com.amazonaws.http.AmazonHttpClient$RequestExecutor.access$500(AmazonHttpClient.java:667)
at com.amazonaws.http.AmazonHttpClient$RequestExecutionBuilderImpl.execute(AmazonHttpClient.java:649)
at com.amazonaws.http.AmazonHttpClient.execute(AmazonHttpClient.java:513)
at com.amazonaws.services.sns.AmazonSNSClient.doInvoke(AmazonSNSClient.java:2300)
at com.amazonaws.services.sns.AmazonSNSClient.invoke(AmazonSNSClient.java:2276)
at com.amazonaws.services.sns.AmazonSNSClient.executeCreateTopic(AmazonSNSClient.java:680)
at com.amazonaws.services.sns.AmazonSNSClient.createTopic(AmazonSNSClient.java:656)
at com.chromeriver.micro.invoiceapp.service.InvoiceAppSnsService.init(InvoiceAppSnsService.java:31)
at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
at java.base/java.lang.reflect.Method.invoke(Method.java:566)
at org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor$LifecycleElement.invoke(InitDestroyAnnotationBeanPostProcessor.java:389)
at org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor$LifecycleMetadata.invokeInitMethods(InitDestroyAnnotationBeanPostProcessor.java:333)
at org.springframework.beans.factory.annotation.InitDestroyAnnotationBeanPostProcessor.postProcessBeforeInitialization(InitDestroyAnnotationBeanPostProcessor.java:157)
... 55 common frames omitted

```
---
## Second issue

Looks like we are missing permissions in the role. Accoding to chatgtp search:

## What this service needs (from the code in `invoice-app-service`)

### 1) SNS (your current failure)

At startup, the service **creates** an SNS topic using the `invoice-app.event.sns.topic` property (in c4-dev it’s `sns_invoice_batch_event_c4-dev` ).  
It also **publishes** messages to that topic (called from the service workflow ).

**IAM actions:**

- `sns:CreateTopic` (because the code calls `createTopic(...)` on boot )
    
- `sns:Publish` (because the code calls `amazonSNSClient.publish(...)` )
    

---

### 2) DynamoDB

The service stores an OCR token by calling `dynamoDB.putItem(...)` with the table name `MicroservicesClientManager.INVOICE_OCR_TOKEN_TABLE` .  
That table name comes from the `invoice-app.dynamodb.invoiceOCRToken` property (c4-dev value: `chromeriver-c4dev-invoice-processtoken` ).

**IAM actions:**

- `dynamodb:PutItem` (required by the explicit `putItem` call )
    

**Also likely needed (library-driven):**  
There’s an Archaius DynamoDB config source wired up via `DynamoDbDeploymentContextTableCache(...)` . The exact DynamoDB actions depend on that library’s implementation, but typically it requires _read_ access on the config table (often `DescribeTable` + `Scan/Query/GetItem`). The code itself doesn’t show the exact calls, so treat these as “probable” until validated in CloudTrail.

---

### 3) S3 (read + list + signed downloads)

The service:
- lists objects via `amazonS3Client.listObjects(...)`
- fetches objects via `amazonS3Client.getObject(...)`
- generates GET pre-signed URLs via `generatePresignedUrl(...)` (the signing principal still needs `s3:GetObject` on those objects)
    

Buckets are configured via:

- `invoice.s3.int.bucket`, `invoice.s3.ext.bucket`, `invoice.s3.pci.bucket`  
    (and the main config shows the int bucket pattern `chromeriver-invoice-int-{{cluster}}-{{env}}` )
    

**IAM actions:**

- `s3:ListBucket` (needed for `listObjects` )
    
- `s3:GetObject` (needed for `getObject` and for signing GET URLs )
    

---

## Example IAM policy skeleton (fill in your account/region/resources)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SnsCreateInvoiceBatchTopic",
      "Effect": "Allow",
      "Action": ["sns:CreateTopic"],
      "Resource": "*",
      "Condition": {
        "StringLike": {
          "sns:TopicName": "sns_invoice_batch_event_*"
        }
      }
    },
    {
      "Sid": "SnsPublishInvoiceBatchEvents",
      "Effect": "Allow",
      "Action": ["sns:Publish"],
      "Resource": "arn:aws:sns:<REGION>:<ACCOUNT_ID>:sns_invoice_batch_event_*"
    },
    {
      "Sid": "DynamoWriteOcrToken",
      "Effect": "Allow",
      "Action": ["dynamodb:PutItem"],
      "Resource": "arn:aws:dynamodb:<REGION>:<ACCOUNT_ID>:table/<INVOICE_OCR_TOKEN_TABLE>"
    },
    {
      "Sid": "S3ListInvoiceBuckets",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::<INVOICE_INT_BUCKET>",
        "arn:aws:s3:::<INVOICE_EXT_BUCKET>",
        "arn:aws:s3:::<INVOICE_PCI_BUCKET>"
      ]
    },
    {
      "Sid": "S3GetInvoiceObjects",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::<INVOICE_INT_BUCKET>/*",
        "arn:aws:s3:::<INVOICE_EXT_BUCKET>/*",
        "arn:aws:s3:::<INVOICE_PCI_BUCKET>/*"
      ]
    },

    {
      "Sid": "DynamoArchaiusConfigReadProbable",
      "Effect": "Allow",
      "Action": ["dynamodb:DescribeTable", "dynamodb:GetItem", "dynamodb:Query", "dynamodb:Scan", "dynamodb:BatchGetItem"],
      "Resource": "arn:aws:dynamodb:<REGION>:<ACCOUNT_ID>:table/<ARCHAIUS_CONFIG_TABLE>"
    }
  ]
}
```

## Practical “know beforehand” workflow that actually works

1. **Static list from code** (what I did above): enumerate SDK calls → map to actions.
    
2. **Run the service with the minimal policy** and use **CloudTrail** (or Access Analyzer “policy generation”) to capture any missing actions from libraries / edge paths.
    
3. If S3 buckets are **SSE-KMS encrypted**, you may also need `kms:Decrypt` / `kms:GenerateDataKey` on the CMK (not visible from this repo).
    

If you tell me which environment you’re targeting (c4-dev vs others) and the actual bucket/table names for `ext/pci` + Archaius table, I can tighten the policy down to exact ARNs (no wildcards).




