module.exports = function (manifest) {
  return {
    ...manifest,
    id: "1358019947661231901",
    documentAccess: "dynamic-page",
    networkAccess: { allowedDomains: ["https://api.voiceflow.com"] },
  };
};
