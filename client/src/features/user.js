import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {value: {email: ""}},
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;