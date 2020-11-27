const assert = require('assert');
const ResourceDeepMerge = require('.');

const plugin = new ResourceDeepMerge({
  service: {
    provider: {
      compiledCloudFormationTemplate: {
        Resources: {
          CloudFrontDistribution: {
            Properties: {
              DistributionConfig: {
                Enabled: true,
              },
            },
          },
        },
      },
    },
    custom: {
      mergeResources: {
        CloudFrontDistribution: {
          Properties: {
            Aliases: ['some.domain.com'],
          },
        },
      },
    },
  },
});

const hook =
  plugin.hooks['after:aws:package:finalize:mergeCustomProviderResources'];

hook();

assert(
  plugin.serverless.service.provider.compiledCloudFormationTemplate.Resources
    .CloudFrontDistribution.Properties.DistributionConfig.Enabled
);

assert(
  plugin.serverless.service.provider.compiledCloudFormationTemplate.Resources
    .CloudFrontDistribution.Properties.Aliases[0] === 'some.domain.com'
);
