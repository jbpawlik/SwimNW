# __SwimNW__

### by [James Benjamin Pawlik](http://github.com/jbpawlik)

![SwimNW](https://github.com/jbpawlik/SwimNW/blob/main/src/assets/images/SwimNW.png?raw=true)

### __Description__
SwimNW is a cross-platform mobile app designed for hydrophiles living in or traveling to the Pacific Northwest. Users can sign up, see swimming spots, and add their own. Due to the sensitive nature of disclosing private swimming holes, SwimNW has a circle-of-trust system whereby users who contribute to the site can access swims marked as Protected, or enter Private swims that only they can access.
### __Technologies Used__
SwimNW was written in React Native for iOS and Android. It uses Firebase and Firestore to store users and saved swims. Countless React Native dependencies were used in the making of SwimNW, with special honors to React Native Maps and the Expo emulator tools.

### __Setup/Installation__
SwimNW has been accepted into the Google Play store. There is a [live development build](https://play.google.com/store/apps/details?id=com.swimnw).

SwimNW is awaiting approval by the App Store.

Due to the mobile nature of this project, it requires extensive setup to run on a desktop computer. The easiest way to run it is by using Expo Go:

1. Clone the project to your local machine
2. Navigate to the top level of the directory
3. Run 'npm install' to install the dependencies
4. Download Expo Go from the Google Play store or App Store.
5. Run 'expo start'. Expo will show a QR code in the terminal window. Scan the code with your phone's camera or the Expo Go scanner. This will run the Expo emulator on your phone.
6. Expo will keep an installer open. You can type 'a' to open an Android emulator, 'i' to open an iOS simulator, or 'w' to open a web build. The success of these methods will depend on your computer setup.

Troubleshooting:
Android:
1. If you have react native installed, use 'react-native run-android' to open the project in Android Studio (or using a different Android emulator).
2. Run 'cd android && ./gradlew' to create the Android build. Then retry any of the above methods.

iOS:
1. Use XCode to simulate the app, using either the 'i' command in Expo or by opening the iOS folder in XCode, then building and running.
2. If these methods do not work, try running 'cd ios', then 'pod install', then re-trying any of the above methods.

### __Known Bugs / Future Goals__
There are a number of known bugs being hunted at this time, including inability to upload pictures, editing swims not uploading some picker information, and a bug that logs the user in upon signup. Please contact the author if you experience poor performance.

Future goals for __SwimNW__:
1. Fully implement circle-of-trust features
2. Comment/review system
3. Saved Swims page
### __License__
This software is licensed under the [BSD license](license.txt).

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

Copyright (c) 2021 James Benjamin Pawlik

### __Contact Information__
Contact the author at __james.benjamin.pawlik@gmail.com__
