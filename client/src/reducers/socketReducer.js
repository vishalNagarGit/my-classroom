// reducer for socket information

import {
    SET_SOCKET
  } from '../actions/types'
  
  const initState = {
    socket:""
  }
  
  export default function global(state=initState, action) {
    switch (action.type) {
        case SET_SOCKET:
          return {
            ...state, 
            socket:action.payload
          }
        default:
          return state;
    }
  }