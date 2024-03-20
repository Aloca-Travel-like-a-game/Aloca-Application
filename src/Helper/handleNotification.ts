import messaging from "@react-native-firebase/messaging";
import AsyncStorage from '@react-native-async-storage/async-storage';

const requestPermission = async () => {
    try {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log("authorization status", authStatus);
            getFCMToken();
        }
    } catch (error) {
        console.log(error);
    }
}
const getFCMToken = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        let fcmToken = await AsyncStorage.getItem("fcm_token");
        console.log("fwcmToken", fcmToken);

        if (!fcmToken) {
            const token = await messaging().getToken();
            AsyncStorage.setItem("fcm_token", token)
        }
    } catch (error) {
        console.log("err", error);

    }
}

export { requestPermission };