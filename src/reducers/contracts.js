const initialState = {
  items: [],
  selected: undefined
}

const getStateText = function(state) {
  switch (state) {
    case '1':
      return 'Initial state';
      break;
    case '2':
      return 'Leased';
      break;
    case '3':
      return 'Offered';
      break;
    case '4':
      return 'Matched';
      break;
    case '6':
      return 'Settlement pending';
      break;
    default:
      return state;
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTRACT":
      action.payload.stateText = getStateText(action.payload.contractState);
//    console.log(action.payload.description, action.payload.description.length);


      var desc = "";
      for(var i = 0; i < action.payload.description.length; i++)
        if (action.payload.description.charCodeAt(i) > 0)
          desc += action.payload.description[i];

      action.payload.description = desc;


      state = {
        ...state,
            items: state.items.concat(action.payload)
      }
      break;

    case "SET_CONTRACTS":

      for (var i = 0; i < action.payload.length; i++) {
        action.payload[i].stateText = getStateText(action.payload[i].contractState);
      }

      state = {
        ...state,
        items: action.payload,
      };
      break;

      case "SELECT_CONTRACT":
        state = {
          ...state,
          selected: action.payload,
        };
        break;
  }

  return state;
}

export default reducer;
