const fs = require('fs');
const path = require('path');
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

    let Resources = service.provider.compiledCloudFormationTemplate.Resources;

    Resources = deepmerge(Resources, service.custom.mergeResources);

    const cwd = process.cwd();

    if (fs.readdirSync(cwd).indexOf('resource-merge.js') != -1) {
      const merger = require(path.resolve(path.join(cwd, 'resource-merge.js')));
      Resources = merger(Resources);
    }

    service.provider.compiledCloudFormationTemplate.Resources = Resources;
  };
}

module.exports = ResourceDeepMerge;
