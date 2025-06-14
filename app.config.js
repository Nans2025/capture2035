// app.config.js
export default {
  expo: {
    name: "Capture2035",
    slug: "capture2035",
    scheme: "capture2035",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "This app uses the camera to let you take and upload media to your time capsule.",
        NSPhotoLibraryUsageDescription: "This app accesses your photo library to upload images or videos.",
      },
    },
    android: {
      package: "com.capture2035.app",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ],
    },
    plugins: [
      "expo-router"
    ]
  }
};




