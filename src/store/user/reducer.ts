import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from ".";



const initialState: IUserState = {
    credentials: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        
    },
  });
  


  export default userSlice.reducer;