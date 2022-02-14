import {
    FETCH_GET_ALL_VEHICLES_REQUEST,
    FETCH_GET_ALL_VEHICLES_SUCCESS,
    FETCH_GET_ALL_VEHICLES_FAILURE,
    FETCH_ADD_VEHICLE,
    FETCH_EDIT_VEHICLE,
    FETCH_ADD_VEHICLE_FAILURE,
    FETCH_INIT_EDIT_VEHICLE,
    FETCH_DELETE_ALL_VEHICLES_SUCCESS
  } from './ActionTypes'
  const initState = {
    loading: false, 
    vehicles: [],
    pageCount:1,
    count:0,
    selectedCount:0,
    error: ""
  };
  
  const VehicleReducer = (state = initState, action) => {
      switch(action.type){
        case FETCH_GET_ALL_VEHICLES_REQUEST: {
          return {
              ...state,
              loading: true,
              error: "",
            };
          }
          case FETCH_GET_ALL_VEHICLES_SUCCESS: {
          return {
              loading: false,
              vehicles: action.payload.vehicles,
              pageCount:action.payload.pageCount,
              count:action.payload.count,
              selectedCount:0,
              error: "",
            };
          }
          case FETCH_GET_ALL_VEHICLES_FAILURE: {
          return {
              vehicles: [],
              error: action.payload,
              loading:false
            };
          }
          case FETCH_ADD_VEHICLE:{
            let list = state.vehicles;
            list.push({...action.payload,checked:false});
            return {...state, loading:false,error:"", vehicles:list};
          }
  
          case FETCH_EDIT_VEHICLE:{
            return {...state, loading:false,error:"edited", vehicles:state.vehicles.map(item => item.id === action.payload.id ? action.payload: item
              )}
          }
          case FETCH_INIT_EDIT_VEHICLE:{
            return {...state, error:""}
          }
          case FETCH_ADD_VEHICLE_FAILURE:{
            return {
              ...state,
              error: action.payload,
              loading:false
            };
          }
          case 'Select':{
            const list = state.vehicles.map(item =>
              item.id === action.payload
                ? { ...item, checked: !item.checked }
                : item
            );
            const count =  list.filter(item=>item.checked).length
            return {...state,vehicles:list, selectedCount:count};
          }
          case 'SelectAll':{
            const list = state.vehicles.map(item => {return { ...item, checked: action.payload }});
            return {...state,vehicles:list, selectedCount:list.filter(item=>item.checked).length};
          }
          case 'DeselectAll':{
            const list = state.vehicles.map(item => {return { ...item, checked: false }});
            return {...state,vehicles:list,selectedCount:0};
          }
          case 'DeleteVehicle':{
            return {...state, 
              vehicles:state.vehicles.filter(item => item.id !== action.payload),
              selectedCount:state.selectedCount-1,
              count:state.count-1,
              loading:false
              }
          }
          case FETCH_DELETE_ALL_VEHICLES_SUCCESS:{
            return {
              loading: false, 
              vehicles: [],
              pageCount:1,
              count:0,
              selectedCount:0,
              error: ""
            }
          }
        default: return state;
      }
  }
  export default VehicleReducer;