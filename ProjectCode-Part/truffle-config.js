const HDWalletProvider = require('truffle-hdwallet-provider');
const infura = "https://rinkeby.infura.io/v3/23d3d790c48e4248bbd1ecd17db08a40";
const mnemonic = "demise west program web zebra sphere refuse track mammal warm toe simple";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      websockets: true,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infura),
        network_id: 4,
        gas: 4500000,
        gasPrice: 10000000000
    }
  },
};