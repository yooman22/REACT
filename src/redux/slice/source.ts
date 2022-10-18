// libraries
import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  isLoading: false,
}

const slice = createSlice({
  name: 'source',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },
  },
})

// Reducer
export default slice.reducer

// Actions
export const { startLoading } = slice.actions
