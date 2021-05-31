import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    countUp: (state) => {
      state.count += 1;
    },
  },
});

export const { countUp } = counterSlice.actions;

export const selectCount = (state: RootState): number => state.counter.count;

export default counterSlice.reducer;
