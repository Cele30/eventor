import { createSlice } from "@reduxjs/toolkit";
import { sampleData } from "../../app/api/sampleData";

const initialState = {
  events: sampleData,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const updatedEvents = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
      state.events = updatedEvents;
    },
    deleteEvent: (state, action) => {
      const newEvents = state.events.filter(
        (event) => event.id !== action.payload
      );
      state.events = newEvents;
    },
  },
});

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export default eventSlice.reducer;
