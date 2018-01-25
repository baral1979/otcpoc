const addContract = (contract) => {
  return {
    type: 'ADD_CONTRACT',
    payload: contract
  };
};

const setContracts = (contracts) => {
  return {
    type: 'SET_CONTRACTS',
    payload: contracts
  };
};

const selectContract = (contract) => {
  return {
    type: 'SELECT_CONTRACT',
    payload: contract
  };
};


const setAddress = (address) => {
  return {
    type: 'SET_ADDRESS',
    payload: address
  };
};

const addTransaction = (trx) => {
  return {
    type: 'ADD_TRX',
    payload: trx
  };
};

const removeTransaction = (trx) => {
  return {
    type: 'REMOVE_TRX',
    payload: trx
  };
};

const addNotification = (notif) => {
  return {
    type: 'ADD_NOTIF',
    payload: notif
  };
};

const removeNotification = (notif) => {
  return {
    type: 'REMOVE_NOTIF',
    payload: notif
  };
};


export default {
  addContract : addContract,
  setContracts : setContracts,
  setAddress: setAddress,
  selectContract: selectContract,
  addTransaction: addTransaction,
  removeTransaction: removeTransaction,
  addNotification: addNotification,
  removeNotification: removeNotification
}
