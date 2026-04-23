const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Supabase'in kullandığı modül uzantılarını listeye ekliyoruz
config.resolver.sourceExts.push('mjs', 'cjs');

// Expo'nun yeni paket çözümleme sisteminin Supabase'i bozmasını engelliyoruz
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: "./global.css" });