import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CardReducer from "../Reducers/CardReducer";
import UserReducer from "../Reducers/UserReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
  listingCard: CardReducer,
  user: UserReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };

  const persistedReducer=persistReducer(persistConfig,rootReducer)
  export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
     serializableCheck: false,
    }),
  })
  export const persistor = persistStore(store);

// store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import CardReducer from "../Reducers/CardReducer";
// import UserReducer from "../Reducers/UserReducer";

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = {
//   listingCard: CardReducer,
//   user: UserReducer,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);
