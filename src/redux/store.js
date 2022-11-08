import { configureStore } from '@reduxjs/toolkit';
import  contactSlice   from './phoneSlice';
import { setFilter }  from './setFilter';

const store = configureStore({
  reducer: {
    contacts: contactSlice,
    filter: setFilter,
   },
});

export default store;
