import {
    FETCH_GET_ALL_DRIVERS_REQUEST,
    FETCH_GET_ALL_DRIVERS_SUCCESS,
    FETCH_GET_ALL_DRIVERS_FAILURE,
    FETCH_ADD_DRIVER,
    FETCH_EDIT_DRIVER,
    FETCH_ADD_DRIVER_FAILURE,
    FETCH_INIT_EDIT_DRIVER,
    FETCH_DELETE_ALL_DRIVERS_SUCCESS
  } from './ActionTypes'
  const initState = {
    loading: false, 
    drivers: [],
    pageCount:1,
    count:0,
    selectedCount:0,
    error: ""
  };
  
  const DriverReducer = (state = initState, action) => {
      switch(action.type){
        case FETCH_GET_ALL_DRIVERS_REQUEST: {
          return {
              ...state,
              loading: true,
              error: "",
            };
          }
          case FETCH_GET_ALL_DRIVERS_SUCCESS: {
          return {
              loading: false,
              drivers: action.payload.drivers,
              pageCount:action.payload.pageCount,
              count:action.payload.count,
              selectedCount:0,
              error: "",
            };
          }
          case FETCH_GET_ALL_DRIVERS_FAILURE: {
          return {
              drivers: [],
              error: action.payload,
              loading:false
            };
          }
          case FETCH_ADD_DRIVER:{
            let list = state.drivers;
            list.push({...action.payload,checked:false});
            return {...state, loading:false,error:"", drivers:list};
          }
  
          case FETCH_EDIT_DRIVER:{
            return {...state, loading:false,error:"edited", drivers:state.drivers.map(item => item.id === action.payload.id ? action.payload: item
              )}
          }
          case FETCH_INIT_EDIT_DRIVER:{
            return {...state, error:""}
          }
          case FETCH_ADD_DRIVER_FAILURE:{
            return {
              ...state,
              error: action.payload,
              loading:false
            };
          }
          case 'Select':{
            const list = state.drivers.map(item =>
              item.id === action.payload
                ? { ...item, checked: !item.checked }
                : item
            );
            const count =  list.filter(item=>item.checked).length
            return {...state,drivers:list, selectedCount:count};
          }
          case 'SelectAll':{
            const list = state.drivers.map(item => {return { ...item, checked: action.payload }});
            return {...state,drivers:list, selectedCount:list.filter(item=>item.checked).length};
          }
          case 'DeselectAll':{
            const list = state.drivers.map(item => {return { ...item, checked: false }});
            return {...state,drivers:list,selectedCount:0};
          }
          case 'DeleteDriver':{
            return {...state, 
              drivers:state.drivers.filter(item => item.id !== action.payload),
              selectedCount:state.selectedCount-1,
              count:state.count-1,
              loading:false
              }
          }
          case FETCH_DELETE_ALL_DRIVERS_SUCCESS:{
            return {
              loading: false, 
              drivers: [],
              pageCount:1,
              count:0,
              selectedCount:0,
              error: ""
            }
          }
        default: return state;
      }
  }
  export default DriverReducer;