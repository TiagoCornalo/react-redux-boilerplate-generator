import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter'

export interface AppStore {
  counter: {
    value: number
  }
}

export default configureStore<AppStore>({
  reducer: {
    counter: counterReducer
  }
})
