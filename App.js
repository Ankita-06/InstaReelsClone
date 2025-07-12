import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ReelsScreen from './src/screens/ReelScreen';

export default function App() {
  return (
    <Provider store={store}>
      <ReelsScreen />
    </Provider>
  );
}
