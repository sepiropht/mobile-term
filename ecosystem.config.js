module.exports = {
  apps : [{
    name   : "mobile-term",
    script : "server.js",
    env: {
      NODE_ENV: "production",
      PORT: 7681
    }
  }]
};