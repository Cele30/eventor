import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSampleData } from "../../app/api/mockApi";

export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const events = await fetchSampleData();
  return events;
});

const initialState = {
  events: [],
  loading: false,
  comments: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const updatedEvents = state.events.map(event =>
        event.id === action.payload.id ? action.payload : event
      );
      state.events = updatedEvents;
    },
    deleteEvent: (state, action) => {
      const newEvents = state.events.filter(
        event => event.id !== action.payload
      );
      state.events = newEvents;
    },
    listenToEvents: (state, action) => {
      state.events = action.payload;
    },
    listenToEventChat: (state, action) => {
      state.comments = action.payload;
    },
    clearComments: state => {
      state.comments = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
    });
  },
});

export const {
  createEvent,
  updateEvent,
  deleteEvent,
  listenToEvents,
  listenToEventChat,
  clearComments,
} = eventSlice.actions;

export default eventSlice.reducer;
