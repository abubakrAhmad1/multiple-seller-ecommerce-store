import {createSlice} from '@reduxjs/toolkit'

const signupSlice = createSlice({
    name : "signup",
    initialState : {
        userGoogleData : null,
        name : null,
        email : null, 
        password : null,
        useGoogle : false,
    },
    reducers : {
        
    }
});

