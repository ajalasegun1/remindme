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
};

const initialState: ReminderState = [];

export const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder: (state, action: PayloadAction<PayloadType>) => {
      const {payload} = action;
      state.push(payload);
    },
  },
});

export const {addReminder} = reminderSlice.actions;
export default reminderSlice.reducer;
