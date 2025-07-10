import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedReels: [],
};

const reelSlice = createSlice({
  name: 'reels',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload;
      if (state.likedReels.includes(id)) {
        state.likedReels = state.likedReels.filter(reelId => reelId !== id);
      } else {
        state.likedReels.push(id);
      }
    },
  },
});

export const { toggleLike } = reelSlice.actions;
export default reelSlice.reducer;
