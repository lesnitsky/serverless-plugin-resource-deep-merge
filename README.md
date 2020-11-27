# Serverless plugin resource deep merge

## Installation

```sh
npm i -D serverless-plugin-resource-deep-merge
```

```yaml
plugins:
  - serverless-plugin-resource-deep-merge
```

## Usage

`serverless.yaml`

```yaml
functions:
  urlrewrite:
    handler: handler.urlrewrite
    events:
      - cloudFront:
          eventType: origin-request
          origin: https://${self:custom.s3Origin}
          isDefaultOrigin: true
```

☝️ This Lambda@Edge function will create a CloudFront distribution which is, unfortunately, hardly customizable due to the default behavior of `resources.extensions`:

[As per doc](https://www.serverless.com/framework/docs/providers/aws/guide/resources/):

> Here's how the extension logic is defined:
> | Resource attribute | Operation |
> | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
> | Properties | Merge. If a property with the same name exists in the resource, the value will be replaced with the extension value. |

`Properties.DistributionConfig` replacement equals to handcrafted CloudFront config, so `deepmerge` of config might be more useful. For example, if you want to add a custom alias to your CloudFront distribution, add the following section to the `serverless.yaml`

```yaml
custom:
  mergeResources:
    CloudFrontDistribution:
      Properties:
        DistributionConfig:
          Aliases:
            - some.domain.com
```

## Contributors

- [Andrei Lesnitsky](https://github.com/lesnitsky_dev)

## LICENSE

WTFPL
