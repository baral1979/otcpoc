const EthQuery = require('eth-query');
const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');
const metamask = require('metamascara');

function ethConnect() {
  const MUST_BE_INITIALIZED = 'ethConnect must be initialized first!';
  const ADDRESS_MUST_BE_DEFINED = 'Address must be defined!';

  let isInit = false,
    ethQuery,
    ethContract;

  const createClients = function() {
    ethQuery = new EthQuery(global.web3.currentProvider);
    eth = new Eth(global.web3.currentProvider);
    ethContract = new EthContract(eth);
  };

  if (!global.web3) {
    if (!window.ENABLE_MASCARA) {
      throw new 'Incompatible browser'();
    }

    const provider = metamask.createDefaultProvider({});
    global.web3 = {
      currentProvider: provider,
    };
  }
  createClients();

  if (ethQuery) isInit = true;

  const getAccounts = function() {
    return new Promise((resolve, reject) => {
      if (!isInit) reject(MUST_BE_INITIALIZED);

      ethQuery.accounts((err, accounts) => {
        if (err) reject(err);

        resolve(accounts);
      });
    });
  };

  const getBalance = function(address) {
    return new Promise((resolve, reject) => {
      if (!isInit) reject(MUST_BE_INITIALIZED);

      if (!address || address.length === 0) reject(ADDRESS_MUST_BE_DEFINED);

      ethQuery.getBalance(address, (err, result) => {
        if (err) reject(err);

        resolve(parseInt(result, 16));
      });
    });
  };

  const getContracts = function(abi, at) {
    if (!isInit) reject(MUST_BE_INITIALIZED);

    return new Promise((resolve, reject) => {
      const contract = ethContract(abi).at(at);

      contract.getContracts((err, contracts) => {
        if (err) reject(err);

        resolve(contracts);
      });
    });
  };

  const getContractTicket = function(abi, at) {
    return new Promise((resolve, reject) => {
      const contract = ethContract(abi).at(at);
      contract
        .getTicket()
        .then(data => {
          console.log('10', data[10]);
          resolve({
            address: at,
            value: data[0].toString(),
            valueT: data[1].toString(),
            units: data[2].toString(),
            unitsT: data[3].toString(),
            rent: data[4].toString(),
            owner: data[5],
            set: data[6],
            seller: data[7],
            buyer: data[8],
            contractState: data[9].toString(),
            description: web3.toAscii(data[10].toString()).toString(),
          });
        })
        .catch(err => reject(err));
    });
  };

  const getContract = function(abi, at) {
    return ethContract(abi).at(at);
  };

  return {
    getBalance,
    getContracts,
    getAccounts,
    getContractTicket,
    getContract,
  };
}

module.exports = ethConnect;
