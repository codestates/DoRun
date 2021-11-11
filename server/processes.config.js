module.exports = {
  apps: [
    {
      script: "dist/src/index.js",
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
