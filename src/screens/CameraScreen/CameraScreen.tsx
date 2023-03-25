import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useState, useRef} from 'react';
import React from 'react';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CameraNavigationProp} from '../../types/navigation';

type flash = 'on' | 'off' | 'auto';

const CameraScreen = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const [hasPermissions, setHasPermissions] = useState<null | boolean>(null);
  const [cameraDevice, setCameraDevice] = useState<CameraDevice | undefined>(
    devices.back,
  );
  const [flash, setFlash] = useState<flash>('auto');
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef<Camera>(null);

  const flashModes: Array<flash> = ['on', 'off', 'auto'];
  const flashModesToIcons = {
    ['on']: 'flash-on',
    ['off']: 'flash-off',
    ['auto']: 'flash-auto',
  };

  const navigation = useNavigation<CameraNavigationProp>();

  const getPermissions = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    setHasPermissions(
      newCameraPermission === 'authorized' &&
        newMicrophonePermission === 'authorized',
    );
  };

  const getPermissionsStatus = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();

    if (hasPermissions === null) return false;

    if (
      cameraPermission === 'authorized' &&
      microphonePermission === 'authorized'
    ) {
      setHasPermissions(true);
      return true;
    }
    setHasPermissions(false);
    return false;
  };

  useEffect(() => {
    const checkPermissions = async () => {
      if (!(await getPermissionsStatus())) {
        getPermissions();
      }
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    setCameraDevice(devices.back);
  }, [devices]);

  const navigateToCreateScreen = () => {
    // navigation.navigate('Create', {
    //   images: [
    //     'https://marketplace.canva.com/EAE-xnqWvJk/1/0/1600w/canva-retro-smoke-and-round-light-desktop-wallpapers-JLofAI27pCg.jpg',
    //     'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
    //     'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
    //   ],
    // });

    navigation.navigate('Create', {
      image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
    });
  };

  const onFlip = () => {
    if (cameraDevice === devices.back) setCameraDevice(devices.front);
    else setCameraDevice(devices.back);
  };

  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto({
        flash: cameraDevice === devices.front ? flash : 'off',
        skipMetadata: true,
        qualityPrioritization: 'balanced',
      });
      console.log(photo);
    } else return;
  };

  const recordVideo = async () => {
    if (camera.current && !isRecording) {
      setIsRecording(true);
      camera.current.startRecording({
        flash: flash,
        onRecordingFinished: video => console.log(video),
        onRecordingError: error => console.error(error),
      });
    }
  };

  const stopRecording = async () => {
    if (camera.current && isRecording) {
      await camera.current.stopRecording();
      setIsRecording(false);
    }
  };

  if (hasPermissions === null)
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (hasPermissions === false)
    return <Text>Do not have acces to camera or microphone</Text>;

  return (
    <View style={styles.page}>
      {/* Need physical device to use <Camera> view */}
      {cameraDevice ? (
        <Camera
          ref={camera}
          device={cameraDevice}
          style={styles.camera}
          isActive={true}
          photo={true}
          video={true}
          audio={true}
        />
      ) : (
        <View style={styles.camera} />
      )}

      {/* Top icons */}

      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />

        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={
              cameraDevice === devices.back
                ? flashModesToIcons[flash]
                : 'flash-off'
            }
            size={30}
            color={colors.white}
          />
        </Pressable>

        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>

      {/* Bottom icons */}

      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        {cameraDevice && (
          <Pressable
            onPress={takePhoto}
            style={[
              styles.circle,
              {backgroundColor: isRecording ? colors.accent : colors.white},
            ]}
            onLongPress={recordVideo}
            delayLongPress={600}
            onPressOut={isRecording ? stopRecording : () => {}}
          />
        )}
        <Pressable onPress={onFlip}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />

          {/* ---------------------- Delete this ------------- */}
          <Pressable onPress={navigateToCreateScreen}>
            <MaterialIcons
              name="arrow-forward"
              size={30}
              color={colors.white}
            />
          </Pressable>
          {/* ---------------------- Delete this ------------- */}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },

  camera: {
    backgroundColor: colors.black,

    width: '100%',
    aspectRatio: 3 / 4,
  },

  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  circle: {
    width: 75,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 75,
  },

  loadingView: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraScreen;
