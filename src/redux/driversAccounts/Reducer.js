import {
    FETCH_GET_ALL_DRIVERS_ACCOUNTS_REQUEST,
    FETCH_GET_ALL_DRIVERS_ACCOUNTS_SUCCESS,
    FETCH_GET_ALL_DRIVERS_ACCOUNTS_FAILURE,
    FETCH_ADD_DRIVER_ACCOUNT,
    FETCH_EDIT_DRIVER_ACCOUNT,
    FETCH_ADD_DRIVER_ACCOUNT_FAILURE,
    FETCH_INIT_EDIT_DRIVER_ACCOUNT,
    FETCH_DELETE_ALL_DRIVERS_ACCOUNTS_SUCCESS
  } from './ActionTypes'
  const initState = {
    loading: false, 
    records: [],
    pageCount:1,
    count:0,
    selectedCount:0,
    error: ""
  };
  
  const RecordReducer = (state = initState, action) => {
      switch(action.type){
        case FETCH_GET_ALL_DRIVERS_ACCOUNTS_REQUEST: {
          return {
              ...state,
              loading: true,
              error: "",
            };
          }
          case FETCH_GET_ALL_DRIVERS_ACCOUNTS_SUCCESS: {
          return {
              loading: false,
              records: action.payload.records,
              pageCount:action.payload.pageCount,
              count:action.payload.count,
              selectedCount:0,
              error: "",
            };
          }
          case FETCH_GET_ALL_DRIVERS_ACCOUNTS_FAILURE: {
          return {
              records: [],
              error: action.payload,
              loading:false
            };
          }
          case FETCH_ADD_DRIVER_ACCOUNT:{
            let list = state.records;
            list.push({...action.payload,checked:false});
            return {...state, loading:false,error:"", records:list};
          }
  
          case FETCH_EDIT_DRIVER_ACCOUNT:{
            return {...state, loading:false,error:"edited", records:state.records.map(item => item.id === action.payload.id ? action.payload: item
              )}
          }
          case FETCH_INIT_EDIT_DRIVER_ACCOUNT:{
            return {...state, error:""}
          }
          case FETCH_ADD_DRIVER_ACCOUNT_FAILURE:{
            return {
              ...state,
              error: action.payload,
              loading:false
            };
          }
          case 'SelectDriverAccount':{
            const list = state.records.map(item =>
              item.id === action.payload
                ? { ...item, checked: !item.checked }
                : item
            );
            const count =  list.filter(item=>item.checked).length
            return {...state,records:list, selectedCount:count};
          }
          case 'SelectAllDriversAccounts':{
            const list = state.records.map(item => {return { ...item, checked: action.payload }});
            return {...state,records:list, selectedCount:list.filter(item=>item.checked).length};
          }
          case 'DeselectAllDriversAccounts':{
            const list = state.records.map(item => {return { ...item, checked: false }});
            return {...state,records:list,selectedCount:0};
          }
          case 'DeleteDriverAccount':{
            return {...state, 
              records:state.records.filter(item => item.id !== action.payload),
              selectedCount:state.selectedCount-1,
              count:state.count-1,
              loading:false
              }
          }
          case FETCH_DELETE_ALL_DRIVERS_ACCOUNTS_SUCCESS:{
            return {
              loading: false, 
              records: [],
              pageCount:1,
              count:0,
              selectedCount:0,
              error: ""
            }
          }
        default: return state;
      }
  }
  export default RecordReducer;