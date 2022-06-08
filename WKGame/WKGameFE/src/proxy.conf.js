const PROXY_CONFIG = [
  {
    context: [
      '/weatherforecast',
      '/getScore',
    ],
    target: "https://localhost:7151",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
