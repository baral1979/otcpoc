const contractSpawnContractABI = [{"constant":true,"inputs":[],"name":"a","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cont","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_rent","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_undefined","type":"bytes32"}],"name":"createContract","outputs":[{"name":"","type":"address"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_cont","type":"address"}],"name":"containsContract","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
;

module.exports = {
  abi: contractSpawnContractABI,
  address: '0x710c09E9e2BA710579dC2c12ddD82C1d138dFb7D',
};
