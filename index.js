const deepmerge = require('deepmerge');

class ResourceDeepMerge {
  constructor(serverless, _) {
    this.serverless = serverless;

    this.hooks = {
      'after:aws:package:finalize:mergeCustomProviderResources': this.deepMerge,
    };
  }

  deepMerge = () => {
    const service = this.serverless.service;
    if (!service.custom) return;
    if (!service.custom.mergeResources) return;

    service.provider.compiledCloudFormationTemplate.Resources = deepmerge(
      service.provider.compiledCloudFormationTemplate.Resources,
      service.custom.mergeResources
    );
  };
}

module.exports = ResourceDeepMerge;
