import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

import adminReducer from "./slices/adminSlice.js";
import ticketReducer from "./slices/ticketSlice.js";
import messageReducer from "./slices/messageSlice.js"
import memberReducer from "./slices/memberSlice.js"
 
// Apply filtering to persist only `userInfo` and `token` from the `USER` slice
const userFilter = createFilter("USER", ["userInfo", "token"]);

// Apply filtering to persist only the `activeTicket` from the `TICKET` slice
const ticketFilter = createFilter("TICKET", ["activeTicket" , "activeChatNo"]);

// Persist Config
const persistConfig = {
  key: "root", // Use 'root' to persist all reducers
  storage,
  whitelist: ["USER", "TICKET"], // Persist both `USER` and `TICKET`
  transforms: [userFilter, ticketFilter], // Apply filters for both `USER` and `TICKET`
};

// Combine reducers
const rootReducer = combineReducers({
  USER: adminReducer,
  TICKET: ticketReducer,
  MESSAGE: messageReducer,
  MEMBER: memberReducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with persisted reducer
export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor to handle the persistence
export const persistor = persistStore(appStore);
