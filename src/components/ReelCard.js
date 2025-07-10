import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const VideoTest = () => {
  const [paused, setPaused] = useState(true);

  const togglePause = () => setPaused((prev) => !prev);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={togglePause}>
        <View style={styles.videoWrapper}>
          <Video
            source={require('../../assets/videos/vid1.mp4')}
            style={styles.video}
            resizeMode="cover"
            repeat
            paused={paused}
            muted={false}
          />
          <Text style={styles.statusText}>{paused ? 'Paused' : 'Playing'}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoWrapper: { height, width },
  video: { width: '100%', height: '100%' },
  statusText: {
    position: 'absolute',
    top: 60,
    left: 20,
    color: 'white',
    fontSize: 20,
  },
});

export default VideoTest;
