import {
    Platform
} from 'react-native';
import Constants from 'expo-constants';
import * as Notification from 'expo-notifications'

const notification = async () => {

    if (Constants.isDevice) {

        let status = (await Notification.getPermissionsAsync()).status;
        console.log(`Status: ${status.status}`)
        if (status !== 'granted') {
            status = (await Notification.requestPermissionsAsync()).status;
        }
        if (status !== 'granted') {
            throw "Permission Denied"
        }
        if (Platform.OS === 'android') {
            Notification.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notification.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return (await Notification.getExpoPushTokenAsync()).data
    } else {
        throw "The User's not using a physical device"
    }
}

export default notification;