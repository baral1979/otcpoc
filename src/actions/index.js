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

const setAddress = (address) => {
  return {
    type: 'SET_ADDRESS',
    payload: address
  };
};

export default {
  addContract : addContract,
  setContracts : setContracts,
  setAddress: setAddress
}
