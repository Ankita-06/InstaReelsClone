// src/redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const reelsSlice = createSlice({
  name: 'reels',
  initialState: {
    pausedReels: {},
    manuallyPausedReels: {}, // ✅ track manual toggles
    currentPlayingId: null,
  },
  reducers: {
    setPaused: (state, action) => {
      const { id, paused, manual = false } = action.payload;
      state.pausedReels[id] = paused;
      if (manual) {
        state.manuallyPausedReels[id] = paused;
      }
    },
    setCurrentPlayingId: (state, action) => {
      state.currentPlayingId = action.payload;
    },
  },
});


export const { setPaused, setCurrentPlayingId } = reelsSlice.actions;

export const store = configureStore({
  reducer: {
    reels: reelsSlice.reducer,
  },
});
