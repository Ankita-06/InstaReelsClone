import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ReelsScreen from './src/screens/ReelScreen';
import VideoTest from './src/components/ReelCard';

export default function App() {
  return (
    <Provider store={store}>
      <ReelsScreen />
    </Provider>
  );
}
