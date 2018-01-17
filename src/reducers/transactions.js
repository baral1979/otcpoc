const initialState = {
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRX":
      state = {
        ...state,
        items: state.items.concat(action.payload)
      }
      break;

    case "REMOVE_TRX":

      state = {
        ...state,
        items: state.items.filter(item => item !== action.payload)
      };
      break;
  }

  return state;
}

export default reducer;
