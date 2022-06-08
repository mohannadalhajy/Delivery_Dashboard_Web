import {
  FETCH_GET_DAILY_ORDERS_REQUEST,
  FETCH_GET_DAILY_ORDERS_SUCCESS,
  FETCH_GET_DAILY_ORDERS_FAILURE,
  FETCH_ADD_ORDER,
  FETCH_EDIT_ORDER,
  FETCH_ADD_ORDER_FAILURE,
  FETCH_INIT_EDIT_ORDER,
  FETCH_DELETE_ALL_ORDERS_SUCCESS
} from './ActionTypes'
const initState = {
  loading: false,
  orders: [],
  pageCount: 1,
  count: 0,
  selectedCount: 0,
  error: "",
  notification: false
};
let audio = new Audio(`${process.env.PUBLIC_URL + '/audio.mp3'}`)
    
const DailyOrderReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_GET_DAILY_ORDERS_REQUEST: {
      return {
        ...state,
        loading: false,
        error: "",
      };
    }
    case FETCH_GET_DAILY_ORDERS_SUCCESS: {
      const notification = state.count!==0 && state.count !== action.payload.count
      if (notification) audio.play()
      else audio.pause()
      return {
        loading: false,
        orders: action.payload.orders,
        pageCount: action.payload.pageCount,
        count: action.payload.count,
        selectedCount: 0,
        error: "",
      };
    }
    case FETCH_GET_DAILY_ORDERS_FAILURE: {
      return {
        orders: [],
        error: action.payload,
        loading: false,
      };
    }
    case FETCH_ADD_ORDER: {
      let list = state.orders;
      list.push({ ...action.payload, checked: false });
      return { ...state, loading: false, error: "", orders: list };
    }

    case FETCH_EDIT_ORDER: {
      return {
        ...state, loading: false, error: "edited", orders: state.orders.map(item => item.id === action.payload.id ? action.payload : item
        )
      }
    }
    case FETCH_INIT_EDIT_ORDER: {
      return { ...state, error: "" }
    }
    case FETCH_ADD_ORDER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }
    case 'Select': {
      const list = state.orders.map(item =>
        item.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      const count = list.filter(item => item.checked).length
      return { ...state, orders: list, selectedCount: count };
    }
    case 'SelectAll': {
      const list = state.orders.map(item => { return { ...item, checked: action.payload } });
      return { ...state, orders: list, selectedCount: list.filter(item => item.checked).length };
    }
    case 'DeselectAll': {
      const list = state.orders.map(item => { return { ...item, checked: false } });
      return { ...state, orders: list, selectedCount: 0 };
    }
    case 'DeleteOrder': {
      return {
        ...state,
        orders: state.orders.filter(item => item.id !== action.payload),
        selectedCount: state.selectedCount - 1,
        count: state.count - 1,
        loading: false
      }
    }
    case FETCH_DELETE_ALL_ORDERS_SUCCESS: {
      return {
        loading: false,
        orders: [],
        pageCount: 1,
        count: 0,
        selectedCount: 0,
        error: "",
      }
    }
    default: return state;
  }
}
export default DailyOrderReducer;
