#Setup

##Installation
- git clone https://github.com/bclynch/excursion-explorer
- cd excursion-explorer && npm install

##Running In Virtual Environment
- $ android to open up sdk menu
- Tools > Manage AVDs > Select + Start Environment
- In project folder: $ react-native run-android

#Debugging
- In the simulator ctrl + m for the dev menu in Android
- Can init remote debugging for console logs
  - Will open tab in browser as a localhost
- Can toggle inspector to look at your components styling
- Can toggle performance to see how framerate is

#Maps
- When installing maps follow this page https://github.com/airbnb/react-native-maps/blob/master/docs/installation.md
- Running $ react-native link should do most of the job
- Build errors dexdebug might be solved by the following:
  - cd into project_folder/android
  - $ gradlew clean
  - cd back to project_folder then react-native run-android
- To function on the emulator make sure the target of the emulator is Google APIs Intel x86 Atom System Image. Also be sure Google Play Services + Google Repository installed
