import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActiveFormType = 'reg' | 'log'

interface AuthMenuSliceInterface {
  isModalOpen: boolean
  activeForm: ActiveFormType
}

const authMenuSliceInitialState: AuthMenuSliceInterface = {
  isModalOpen: false,
  activeForm: 'log',
}

export const authMenuSlice = createSlice({
  name: 'authMenu',
  initialState: authMenuSliceInitialState,
  reducers: {
    changeOpenState: (state, value : PayloadAction<boolean>) => {
      console.log(value, state)
      state.isModalOpen = value.payload
    },
    changeActiveForm: (state, value : PayloadAction<ActiveFormType>) => {
      state.activeForm = value.payload
    },
  },
});

export const { changeOpenState, changeActiveForm } = authMenuSlice.actions;

export default authMenuSlice.reducer;