module.exports = {
  apps: [
    {
      script: "dist/src/index.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};

console;
