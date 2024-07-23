import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateProfileReducer from "./slices/updateProfileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobReducer,
    applications: applicationReducer,
    updateProfile: updateProfileReducer
  },
});

export default store;
