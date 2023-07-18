module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    varsion: "pragma",
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}