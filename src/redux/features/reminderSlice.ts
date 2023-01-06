import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type ReminderState = Array<{
  notification_id: string;
  id: string;
  title: string;
  body: string;
  date: string;
  time: string;
  pinned: boolean;
  backgroundColor: string;
  done: boolean;
  repeat: string;
}>;

export type PayloadType = {
  notification_id: string;
  id: string;
  title: string;
  body: string;
  date: string;
  time: string;
  pinned: boolean;
  backgroundColor: string;
  done: boolean;
  repeat: string;
};

export type MarkType = string;

const initialState: ReminderState = [];

export const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder: (state, action: PayloadAction<PayloadType>) => {
      const {payload} = action;
      state.unshift(payload);
    },
    toggleMarkAsDone: (state, action: PayloadAction<MarkType>) => {
      const {payload} = action;
      const index = state.findIndex(item => item.notification_id === payload);
      state[index].done = !state[index].done;
    },
    togglePinned: (state, action: PayloadAction<MarkType>) => {
      const {payload} = action;
      const index = state.findIndex(item => item.notification_id === payload);
      state[index].pinned = !state[index].pinned;
    },
    deleteReminder: (state, action: PayloadAction<MarkType>) => {
      const {payload} = action;
      const index = state.findIndex(item => item.notification_id === payload);
      state.splice(index, 1);
    },
  },
});

export const {addReminder, toggleMarkAsDone, togglePinned, deleteReminder} =
  reminderSlice.actions;
export default reminderSlice.reducer;
