import {
    FETCH_GET_ALL_CUSTOMERS_REQUEST,
    FETCH_GET_ALL_CUSTOMERS_SUCCESS,
    FETCH_GET_ALL_CUSTOMERS_FAILURE,
    FETCH_ADD_CUSTOMER,
    FETCH_EDIT_CUSTOMER,
    FETCH_ADD_CUSTOMER_FAILURE,
    FETCH_INIT_EDIT_CUSTOMER,
    FETCH_DELETE_ALL_CUSTOMERS_SUCCESS
  } from './ActionTypes'
  const initState = {
    loading: false, 
    customers: [],
    pageCount:1,
    count:0,
    selectedCount:0,
    error: ""
  };
  
  const CustomerReducer = (state = initState, action) => {
      switch(action.type){
        case FETCH_GET_ALL_CUSTOMERS_REQUEST: {
          return {
              ...state,
              loading: true,
              error: "",
            };
          }
          case FETCH_GET_ALL_CUSTOMERS_SUCCESS: {
          return {
              loading: false,
              customers: action.payload.customers,
              pageCount:action.payload.pageCount,
              count:action.payload.count,
              selectedCount:0,
              error: "",
            };
          }
          case FETCH_GET_ALL_CUSTOMERS_FAILURE: {
          return {
              customers: [],
              error: action.payload,
              loading:false
            };
          }
          case FETCH_ADD_CUSTOMER:{
            let list = state.customers;
            list.push({...action.payload,checked:false});
            return {...state, loading:false,error:"", customers:list};
          }
  
          case FETCH_EDIT_CUSTOMER:{
            return {...state, loading:false,error:"edited", customers:state.customers.map(item => item.id === action.payload.id ? action.payload: item
              )}
          }
          case FETCH_INIT_EDIT_CUSTOMER:{
            return {...state, error:""}
          }
          case FETCH_ADD_CUSTOMER_FAILURE:{
            return {
              ...state,
              error: action.payload,
              loading:false
            };
          }
          case 'SelectCustomer':{
            const list = state.customers.map(item =>
              item.id === action.payload
                ? { ...item, checked: !item.checked }
                : item
            );
            const count =  list.filter(item=>item.checked).length
            return {...state,customers:list, selectedCount:count};
          }
          case 'SelectAllCustomers':{
            const list = state.customers.map(item => {return { ...item, checked: action.payload }});
            return {...state,customers:list, selectedCount:list.filter(item=>item.checked).length};
          }
          case 'DeselectAllCustomers':{
            const list = state.customers.map(item => {return { ...item, checked: false }});
            return {...state,customers:list,selectedCount:0};
          }
          case 'DeleteCustomer':{
            return {...state, 
              customers:state.customers.filter(item => item.id !== action.payload),
              selectedCount:state.selectedCount-1,
              count:state.count-1,
              loading:false
              }
          }
          case FETCH_DELETE_ALL_CUSTOMERS_SUCCESS:{
            return {
              loading: false, 
              customers: [],
              pageCount:1,
              count:0,
              selectedCount:0,
              error: ""
            }
          }
        default: return state;
      }
  }
  export default CustomerReducer;