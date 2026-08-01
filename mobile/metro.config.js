const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add this line to fix the framer-motion .mjs crash!
config.resolver.sourceExts.push('mjs');

module.exports = withNativeWind(config, { input: "./src/global.css" });
