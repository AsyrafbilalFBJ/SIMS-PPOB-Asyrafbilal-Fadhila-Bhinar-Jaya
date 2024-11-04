import { createSlice } from '@reduxjs/toolkit';
import { getProfileAction } from '../actions/profile';

const initialState = {
  data: {},
  errorMessage: '',
  successMessage: '',
  warningMessage: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setErrorMessage: (state, action)=>{
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action)=>{
      state.successMessage = action.payload;
    },
    setWarningMessage: (state, action)=>{
      state.warningMessage = action.payload;
    },
    clearMessage: (state) =>{
      state.errorMessage= '';
      state.warningMessage= '';
      state.successMessage= '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default profileSlice.reducer;
