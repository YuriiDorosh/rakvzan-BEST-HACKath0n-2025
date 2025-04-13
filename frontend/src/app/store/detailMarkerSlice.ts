import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActiveFormType = 'reg' | 'log'

interface detailMarkerSliceInterface {
  id: number
  isOpen: boolean
  title: string
  address: string
  accesabilityList: any[]
  comments: any[]
  raiting: number
  photos: any[]
}

const detailMarkerSliceInitialState: detailMarkerSliceInterface = {
  id: 0,
  isOpen: false,
  title: '',
  address: '',
  accesabilityList: [],
  comments: [],
  raiting: 0,
  photos: [],
}

export const detailMarkerSlice = createSlice({
  name: 'detailMarker',
  initialState: detailMarkerSliceInitialState,
  reducers: {
    setValues: (state, value : PayloadAction<detailMarkerSliceInterface>) => {
      state = value.payload
      return value.payload
    },
    chaneIsOpen: (state, value : PayloadAction<boolean>) => {
      if (!value.payload){
        return detailMarkerSliceInitialState 
      }
      return state
    },
  },
});

export const { setValues, chaneIsOpen } = detailMarkerSlice.actions;

export default detailMarkerSlice.reducer;