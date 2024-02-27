const { override } = require("customize-cra");

const overrideEntry = (config) => {
  config.entry = {
    main: "./src/popup", // the extension UI
    background: "./src/background",
    content: "./src/content",
    option: "./src/option",
    price_content: "./src/price_content",
  };

  return config;
};

const overrideOutput = (config) => {
  config.output = {
    ...config.output,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].js",
    // filename: "static/css/[name].css",
    // chunkFilename: "static/css/[name].css",
  };

  return config;
};

module.exports = {
  webpack: (config) => override(overrideEntry, overrideOutput)(config),
};
