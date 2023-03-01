import {View, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';

const PostUploadScreen = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const [hasPermissions, setHasPermissions] = useState<null | boolean>(null);
  const [flip, setFlip] = useState(device);

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
      const d = await Camera.getAvailableCameraDevices();
      console.log(d);

      if (!(await getPermissionsStatus())) {
        getPermissions();
      }
    };
    checkPermissions();
    console.log(devices);
  }, []);

  const onFlip = () => {
    if (flip === devices.back) setFlip(devices.front);
  };

  if (hasPermissions === null) return <Text>Loading...</Text>;
  if (hasPermissions === false)
    return <Text>Do not have acces to camera or microphone</Text>;
  return (
    <View style={styles.page}>
      {/* Need physical device to test <Camera> view */}
      {/* <Camera device={flip} style={styles.camera} isActive={true} /> */}

      <View style={styles.camera} />

      {/* Top icons */}

      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <MaterialIcons name="flash-off" size={30} color={colors.white} />
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>

      {/* Bottom icons */}

      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        <View style={styles.circle} />
        <MaterialIcons name="flip-camera-ios" size={30} color={colors.white} />
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
});

export default PostUploadScreen;
