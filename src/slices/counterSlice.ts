import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface CounterState {
  value: number;
  mode: boolean;
}

const initialState: CounterState = {
  value: 0,
  mode: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    toggleMode: (state) => {
      state.mode = !state.mode;
    },
  },
});

export const { increment, decrement, toggleMode } = counterSlice.actions;

export const selectCount = (state: RootState): number => state.counter.value;
export const selectMode = (state: RootState): boolean => state.counter.mode;

export default counterSlice.reducer;
