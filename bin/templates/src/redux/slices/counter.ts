import { createSlice } from '@reduxjs/toolkit'
import { CounterState } from '../../models/counter.type'

const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++
    }
  }
})

export const { increment } = counterSlice.actions

export default counterSlice.reducer
