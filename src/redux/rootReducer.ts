import { combineReducers } from 'redux'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import source from './slice/source'

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null)
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value)
  },
  removeItem(_key: string) {
    return Promise.resolve()
  },
})

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
}

const rootReducer = combineReducers({
  source: source,
})
export { rootPersistConfig, rootReducer }
