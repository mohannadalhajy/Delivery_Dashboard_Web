import {
    FETCH_GET_ALL_CLIENTS_REQUEST,
    FETCH_GET_ALL_CLIENTS_SUCCESS,
    FETCH_GET_ALL_CLIENTS_FAILURE,
    FETCH_ADD_CLIENT,
    FETCH_EDIT_CLIENT,
    FETCH_ADD_CLIENT_FAILURE,
    FETCH_INIT_EDIT_CLIENT,
    FETCH_DELETE_ALL_CLIENTS_SUCCESS
  } from './ActionTypes'
  const initState = {
    loading: false, 
    clients: [],
    pageCount:1,
    count:0,
    selectedCount:0,
    error: ""
  };
  
  const ClientReducer = (state = initState, action) => {
      switch(action.type){
        case FETCH_GET_ALL_CLIENTS_REQUEST: {
          return {
              ...state,
              loading: true,
              error: "",
            };
          }
          case FETCH_GET_ALL_CLIENTS_SUCCESS: {
          return {
              loading: false,
              clients: action.payload.clients,
              pageCount:action.payload.pageCount,
              count:action.payload.count,
              selectedCount:0,
              error: "",
            };
          }
          case FETCH_GET_ALL_CLIENTS_FAILURE: {
          return {
              clients: [],
              error: action.payload,
              loading:false
            };
          }
          case FETCH_ADD_CLIENT:{
            let list = state.clients;
            list.push({...action.payload,checked:false});
            return {...state, loading:false,error:"", clients:list};
          }
  
          case FETCH_EDIT_CLIENT:{
            return {...state, loading:false,error:"edited", clients:state.clients.map(item => item.id === action.payload.id ? action.payload: item
              )}
          }
          case FETCH_INIT_EDIT_CLIENT:{
            return {...state, error:""}
          }
          case FETCH_ADD_CLIENT_FAILURE:{
            return {
              ...state,
              error: action.payload,
              loading:false
            };
          }
          case 'Select':{
            const list = state.clients.map(item =>
              item.id === action.payload
                ? { ...item, checked: !item.checked }
                : item
            );
            const count =  list.filter(item=>item.checked).length
            return {...state,clients:list, selectedCount:count};
          }
          case 'SelectAll':{
            const list = state.clients.map(item => {return { ...item, checked: action.payload }});
            return {...state,clients:list, selectedCount:list.filter(item=>item.checked).length};
          }
          case 'DeselectAll':{
            const list = state.clients.map(item => {return { ...item, checked: false }});
            return {...state,clients:list,selectedCount:0};
          }
          case 'DeleteClient':{
            return {...state, 
              clients:state.clients.filter(item => item.id !== action.payload),
              selectedCount:state.selectedCount-1,
              count:state.count-1,
              loading:false
              }
          }
          case FETCH_DELETE_ALL_CLIENTS_SUCCESS:{
            return {
              loading: false, 
              clients: [],
              pageCount:1,
              count:0,
              selectedCount:0,
              error: ""
            }
          }
        default: return state;
      }
  }
  export default ClientReducer;