const initialState = {
  address: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADDRESS":

      state = {
        ...state,
        address: action.payload
      }
      break;

  }

  return state;
}

export default reducer;
