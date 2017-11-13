const epayContractABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_settler',
        type: 'address',
      },
      {
        name: '_units',
        type: 'uint256',
      },
    ],
    name: 'confirmOffer',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'seller',
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
        name: '_valueT',
        type: 'uint256',
      },
    ],
    name: 'tradeContract',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'payVoid',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'unitsT',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'valueT',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'claimBalance',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'abort',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'unpostSettlement',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_unitsT',
        type: 'uint256',
      },
    ],
    name: 'tradeBuyer',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'confirmSellerTrade',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'value',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'confirmContractTrade',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'parent',
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
        name: '_valueT',
        type: 'uint256',
      },
    ],
    name: 'changeContractTrade',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_contract',
        type: 'address',
      },
    ],
    name: 'settle',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'buyer',
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
        name: '_outcome',
        type: 'uint256',
      },
    ],
    name: 'settleF',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'rent',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'cancelContractTrade',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
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
    inputs: [],
    name: 'confirmBuyerTrade',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'units',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_valueT',
        type: 'uint256',
      },
    ],
    name: 'tradeSeller',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'settler',
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
    ],
    name: 'setRent',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getTicket',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
      },
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'state',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'lease',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'defineSettlement',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'collectFee',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'confirmPurchase',
    outputs: [],
    payable: true,
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_valueResult',
        type: 'uint256',
      },
    ],
    name: 'postResult',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
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
    payable: true,
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'aborted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'purchaseConfirmed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'itemReceived',
    type: 'event',
  },
];

module.exports = {
  abi: epayContractABI,
  address: '0x453778dcd89acd92a84bccac9eefecb4258aac24',
};
