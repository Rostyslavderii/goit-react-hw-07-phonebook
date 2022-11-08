import { createSlice } from '@reduxjs/toolkit';
import { setFilter } from './setFilter';
import {
  addContact,
  deleteContact,
  getContatcts,
} from './phoneOperations';


const initialState = {
  contacts: [],
  filterTerm: '',
  isFetching: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    [setFilter]: (state, action) => {
      state.filterTerm = action.payload;
    },
  },

  extraReducers: {
    //getContatcts
    [getContatcts.pending]: state => {
      state.isFetching = true;
    },
    [getContatcts.fulfilled]: (state, action) => {
      state.contacts = action.payload;
      state.isFetching = false;
    },
    [getContatcts.rejected]: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    }, //deleteContact
    [deleteContact.pending]: state => {
      state.isFetching = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.contacts = state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
      state.isFetching = false;
    },
    [deleteContact.rejected]: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    }, //addContact
    [addContact.pending]: state => {
      state.isFetching = true;
    },
    [addContact.fulfilled]: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
      state.isFetching = false;
    },
    [addContact.rejected]: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  }
});

export default contactSlice.reducer;
