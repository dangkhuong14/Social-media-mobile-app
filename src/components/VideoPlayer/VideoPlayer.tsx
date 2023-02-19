import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IVideoPlayer {
  uri: string;
  paused?: boolean;
}

const VideoPlayer = ({uri, paused = true}: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);
  const [currentPlayedTime, setCurrentPlayedTime] = useState(0);
  const totalTime = useRef(0);

  const fourDigitsTimer = (timeInSeconds: number): string => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    let secondsString;
    let minutesString;

    if (seconds < 10) {
      secondsString = `0${seconds}`;
    } else {
      secondsString = `${seconds}`;
    }

    minutesString = `${minutes}`;

    return `${minutesString}:${secondsString}`;
  };

  let currentPlayedTimerToString = fourDigitsTimer(currentPlayedTime);
  let totalTimeToString = fourDigitsTimer(totalTime.current);

  return (
    <View>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted={muted}
        paused={paused}
        onProgress={({currentTime, seekableDuration}) => {
          totalTime.current = Math.round(seekableDuration);
          setCurrentPlayedTime(Math.round(currentTime));
        }}
      />
      <Pressable onPress={() => setMuted(v => !v)} style={styles.muteButton}>
        <Ionicons
          name={muted ? 'volume-mute' : 'volume-medium'}
          size={14}
          color={colors.white}
        />
      </Pressable>
      <View style={styles.videoTimer}>
        <Text style={styles.timerText}>
          {currentPlayedTimerToString} / {totalTimeToString}
        </Text>
      </View>
      {totalTime.current === 0 ?? (
        <View style={styles.waitingView}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 1,
  },

  muteButton: {
    backgroundColor: colors.black,
    borderRadius: 25,

    position: 'absolute',
    bottom: 10,
    right: 10,

    padding: 5,
  },

  videoTimer: {
    backgroundColor: colors.black,
    position: 'absolute',
    top: 10,
    right: 10,

    padding: 5,
  },

  timerText: {
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.semi,
    color: colors.white,
  },

  waitingView: {
    position: 'absolute',
    top: 0,
    width: '100%',
    aspectRatio: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VideoPlayer;
