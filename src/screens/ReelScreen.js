import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { reelsData } from '../data/reels';
import { setPaused, setCurrentPlayingId, toggleLike } from '../redux/store';


const { width, height } = Dimensions.get('window');

const ReelsScreen = () => {
  const dispatch = useDispatch();
  const { pausedReels, currentPlayingId, manuallyPausedReels, likedReels } = useSelector((state) => state.reels);
  const flatListRef = useRef();
  const [showPlayIcon, setShowPlayIcon] = useState({}); 
  const handleLike = (id) => {
    dispatch(toggleLike(id));
    setTimeout(() => {
      console.log('Redux likedReels:', likedReels);
    }, 200); 
  };
  
  

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentId = viewableItems[0].item.id;
      dispatch(setCurrentPlayingId(currentId));
  
      reelsData.forEach((item) => {
        const isManuallyPaused = manuallyPausedReels[item.id] ?? false;
  
        dispatch(setPaused({
          id: item.id,
          paused: item.id !== currentId || isManuallyPaused,
        }));
      });
  
      setShowPlayIcon({});
    }
  }).current;
  
  
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const handleVideoToggle = (id) => {
    const isPaused = pausedReels[id] ?? false;
    const newPauseState = !isPaused;
  
    dispatch(setPaused({ id, paused: newPauseState, manual: true }));
  
    setShowPlayIcon((prev) => ({
      ...prev,
      [id]: newPauseState,
    }));
  };
  
  const renderItem = ({ item }) => {
    const isPaused = pausedReels[item.id] ?? (item.id !== currentPlayingId);
    const shouldShowPlayIcon = showPlayIcon[item.id] || false;
  
    return (
      <View style={{ height, width }}>
    <View style={StyleSheet.absoluteFill}>

          <Video
            source={item.videoUrl}
            style={styles.video}
            resizeMode="cover"
            repeat
            muted
            paused={isPaused}
          />
  
  <View style={styles.touchableOverlay}>
  <TouchableWithoutFeedback onPress={() => handleVideoToggle(item.id)}>
    <View style={StyleSheet.absoluteFill} />
  </TouchableWithoutFeedback>
</View>

  
          {shouldShowPlayIcon && isPaused && (
  <TouchableWithoutFeedback onPress={() => handleVideoToggle(item.id)}>
    <View style={styles.playIconContainer}>
      <Image
        source={require('../../assets/images/play.png')}
        style={styles.playIcon}
      />
    </View>
  </TouchableWithoutFeedback>
)}

          <View style={styles.overlay} pointerEvents="box-none">
            <Text style={styles.reelsTitle}>Reels</Text>
  
            <View style={styles.cameraIcon}>
              <Image source={require('../../assets/images/camera.png')} style={styles.camIconImage} />
            </View>
  
            <View style={styles.bottomContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
                  style={styles.profilePic}
                />
                <Text style={styles.username}>{item.profile} • Follow</Text>
              </View>
  
              <Text style={styles.caption}>{item.caption}</Text>
  
              <View style={styles.iconsRow}>
                <View style={styles.leftIcons}>
                <TouchableOpacity onPress={() => handleLike(item.id)}>
  <Image
    source={
      likedReels[item.id]
        ? require('../../assets/images/heartF.png')
        : require('../../assets/images/heart.png')
    }
    style={styles.iconImage}
  />
</TouchableOpacity>
                  <Image source={require('../../assets/images/comment.png')} style={[styles.iconImage, { marginLeft: 12 }]} />
                  <Image source={require('../../assets/images/send.png')} style={[styles.iconImage, { marginLeft: 12 }]} />
                </View>
  
                <View style={styles.rightIcons}>
                  <View style={styles.iconGroup}>
                    <Image source={require('../../assets/images/heart.png')} style={styles.iconImage} />
                    <Text style={styles.iconText}>{item.likes}</Text>
                  </View>
                  <View style={styles.iconGroup}>
                    <Image source={require('../../assets/images/comment.png')} style={styles.iconImage} />
                    <Text style={styles.iconText}>{item.comments}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <View style={{ flex: 1 }}>
      <FlatList
      contentContainerStyle={{ height: height * reelsData.length }}
        ref={flatListRef}
        data={reelsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        extraData={likedReels}
      />
      <View style={styles.bottomNav}>
        <Image source={require('../../assets/images/home.png')} style={styles.navIcon} />
        <Image source={require('../../assets/images/search.png')} style={styles.navIcon} />
        <Image source={require('../../assets/images/reel.png')} style={[styles.navIcon, { height: 32, width: 32 }]} />
        <Image source={require('../../assets/images/bag.png')} style={[styles.navIcon, { height: 28, width: 28 }]} />
        <Image source={require('../../assets/images/user.png')} style={styles.navIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#222',
    borderTopWidth: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  reelContainer: {
    height,
    width: '100%',
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  playIconContainer: {
    position: 'absolute',
    top: height / 2 - 40,
    left: width / 2 - 40,
    zIndex: 10,
  },
  playIcon: {
    width: 80,
    height: 80,
    tintColor: 'white',
    opacity: 0.9,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 1,
  },
  reelsTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
  },
  cameraIcon: {
    position: 'absolute',
    top: 18,
    right: 18,
  },
  camIconImage: {
    width: 24,
    height: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height / 9,
    left: 16,
    right: 16,
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
  },
  caption: {
    color: '#fff',
    marginVertical: 4,
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    marginRight: width / 4,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#D3D3D3',
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  
});

export default ReelsScreen;
