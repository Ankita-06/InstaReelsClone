import { configureStore, createSlice } from '@reduxjs/toolkit';

const reelsSlice = createSlice({
  name: 'reels',
  initialState: {
    pausedReels: {},
    manuallyPausedReels: {},
    currentPlayingId: null,
    likedReels: {},
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
    toggleLike: (state, action) => { 
      const id = action.payload;
      state.likedReels[id] = !state.likedReels[id];
    },
  },
});

export const { setPaused, setCurrentPlayingId, toggleLike } = reelsSlice.actions;


export const store = configureStore({
  reducer: {
    reels: reelsSlice.reducer,
  },
});
