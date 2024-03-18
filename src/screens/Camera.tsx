/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {
  useCameraPermission,
  useMicrophonePermission,
  useCameraDevice,
  Camera,
  PhotoFile,
  TakePhotoOptions,
  CameraPosition,
} from 'react-native-vision-camera';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const CameraScreen = () => {
  const navigation = useNavigation();
  const [camereaSide, setCamereaSide] = useState<CameraPosition>('back');
  const device = useCameraDevice(camereaSide, {
    physicalDevices: ['ultra-wide-angle-camera'],
  });

  const {hasPermission, requestPermission} = useCameraPermission();
  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  const [isActive, setIsActive] = useState(false);
  const [flash, setFlash] = useState<TakePhotoOptions['flash']>('off');

  const [photo, setPhoto] = useState<PhotoFile>();
  const [isTakingPhoto, setIsTakingPhoto] = useState<boolean>(false);

  const camera = useRef<Camera>(null);

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, []),
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }

    if (!microphonePermission) {
      requestMicrophonePermission();
    }
  }, [
    hasPermission,
    microphonePermission,
    requestMicrophonePermission,
    requestPermission,
  ]);

  const onTakePicturePressed = async () => {
    setIsTakingPhoto(true);
    setPhoto(
      await camera.current?.takePhoto({
        flash,
        enableShutterSound: true,
      }),
    );
    setIsTakingPhoto(false);
  };

  const uploadPhoto = async () => {
    if (!photo) {
      return;
    }
    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    console.log(data);
  };

  if (!hasPermission || !microphonePermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>Không tìm thấy camera</Text>;
  }
  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive && !photo}
        photo={true}
      />

      {photo && (
        <>
          <Image
            source={{uri: `file://${photo.path}`}}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons
            onPress={() => setPhoto(undefined)}
            name="arrow-back-sharp"
            size={25}
            color="white"
            style={{position: 'absolute', top: 30, left: 30}}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
            }}>
            <Button title="Upload" onPress={uploadPhoto} />
          </View>
        </>
      )}

      {!photo && (
        <>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-sharp"
            size={25}
            color="white"
            style={{position: 'absolute', top: 30, left: 30}}
          />
          <View
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              padding: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
              gap: 30,
            }}>
            <Ionicons
              name={flash === 'off' ? 'flash-off' : 'flash'}
              onPress={() =>
                setFlash(curValue => (curValue === 'off' ? 'on' : 'off'))
              }
              size={30}
              color="white"
            />
          </View>
          <TouchableOpacity
            onPress={onTakePicturePressed}
            disabled={isTakingPhoto}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: 50,
              width: 75,
              height: 75,
              backgroundColor: 'white',
              borderRadius: 75,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              setCamereaSide(camereaSide === 'back' ? 'front' : 'back')
            }
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: 75,
              right: 50,
              borderRadius: 75,
            }}>
            <Ionicons
              name={
                camereaSide === 'back'
                  ? 'camera-reverse-outline'
                  : 'camera-reverse-sharp'
              }
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CameraScreen;
