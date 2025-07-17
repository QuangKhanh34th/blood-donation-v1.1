import { combineReducers } from "@reduxjs/toolkit";
import useReducer from "./features/userSlice";
import bloodHistoryReducer from "./features/bloodHistorySlice";
import accountSlice from "./features/accountSlice";
import programSlice from "./features/programSlice";
import bloodRequestReducer from "./features/bloodRequestSlice";
import addressSlice from "./features/addressSlice";
import citySlice from "./features/citySlice";
import slotSlice from "./features/slotSlice";
import donationFormReducer from "./features/donationFormSlice";
import blogReducer from "./features/blogSlice";


const rootReducer = combineReducers({
  user: useReducer,
  bloodHistory: bloodHistoryReducer,
  account: accountSlice,
  bloodRequest: bloodRequestReducer,
  donationForm: donationFormReducer,
  blog: blogReducer,
  program: programSlice,
  address: addressSlice,
  city: citySlice,
  slot: slotSlice,
});

export default rootReducer;
