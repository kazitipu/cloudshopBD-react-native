/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src";
import messaging from "@react-native-firebase/messaging";
import { name as appName } from "./app.json";
import { onDisplayNotification } from "./src/notifications";
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("message handled in the background", remoteMessage);
  //   onDisplayNotification(remoteMessage);
});

// messaging().getInitialNotification(async (remoteMessage) => {
//   console.log(remoteMessage);
//   //   onDisplayNotification(remoteMessage);
// });
AppRegistry.registerComponent(appName, () => App);

// SHA-1(5e:8f:16:06:2e:a3:cd:2c:4a:0d:54:78:76:ba:a6:f3:8c:ab:f6:25)
// SHA-256(fa:c6:17:45:dc:09:03:78:6f:b9:ed:e6:2a:96:2b:39:9f:73:48:f0:bb:6f:89:9b:83:32:66:75:91:03:3b:9c)
