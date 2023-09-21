import { createReducer } from "@reduxjs/toolkit";

const initialState ={

}
export const customerReducer = createReducer(initialState, {
    LoadCustomer: (state)=>{
        state.loading = false
    },
    clearError: (state)=>{
        state.error = null
    },
});