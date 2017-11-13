const contractSpawnContractABI = [
  {
    constant: true,
    inputs: [],
    name: 'a',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'cont',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_rent',
        type: 'uint256',
      },
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'createContract',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: true,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getContracts',
    outputs: [
      {
        name: '',
        type: 'address[]',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_cont',
        type: 'address',
      },
    ],
    name: 'containsContract',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    inputs: [],
    type: 'constructor',
  },
];

module.exports = {
  abi: contractSpawnContractABI,
  address: '0x77ec5c540a3c4145522D874c2e96bBd5EB684fB8',
};
