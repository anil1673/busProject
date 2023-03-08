import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./index.js"
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import { combineReducers } from "redux"; 
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";

const persistConfig=({
    key:"root",
    version:1,
    storage
})



const persistedReducer=persistReducer(persistConfig,authReducer)

export  const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})