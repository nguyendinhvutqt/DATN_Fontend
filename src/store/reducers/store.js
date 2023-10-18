import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice"; // Thay đổi đường dẫn đến file userSlice của bạn

const rootReducer = combineReducers({
  user: userReducer,
  // Thêm các reducer khác vào đây nếu bạn có
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Chỉ lưu trạng thái của "user"
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
