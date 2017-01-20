#Setup

##Installation
- git clone https://github.com/bclynch/excursion-explorer
- cd excursion-explorer && npm install

##Running In Virtual Environment
- $ android to open up sdk menu
- Tools > Manage AVDs > Select + Start Environment
- In project folder: $ react-native run-android

##Updating travel warnings json
- Check for updates on this page https://cadatacatalog.state.gov/dataset/travel
- Make sure to update json file names with date for regular Updating
- Place json in assets folder
- Update formatTravelWarnings.js with correct file path
- Run $ node assets/TravelWarnings/formatTravelWarnings.js to create new, formatted JSON obj in assets

#Debugging
- In the simulator ctrl + m for the dev menu in Android
- Can init remote debugging for console logs
  - Will open tab in browser as a localhost
- Can toggle inspector to look at your components styling
- Can toggle performance to see how framerate is

#Change app Icon
- https://myexperimentswithweb.wordpress.com/2016/05/23/changing-app-icon-in-android-react-native-generated-apps/
- http://makeappicon.com/
- https://jsfiddle.net/bclynch/fm3wa415/10/

#Maps
- When installing maps follow this page https://github.com/airbnb/react-native-maps/blob/master/docs/installation.md
- Running $ react-native link should do most of the job
- Build errors dexdebug might be solved by the following:
  - cd into project_folder/android
  - $ gradlew clean
  - cd back to project_folder then react-native run-android
- To function on the emulator make sure the target of the emulator is Google APIs Intel x86 Atom System Image. Also be sure Google Play Services + Google Repository installed

#Generate Release APK
- Update version number for build in android/app/build.gradle
- $ cd android
- gradlew assembleRelease
- apk for upload in android/app/build/outputs/apk/app-release.apk
- To test build run $ react-native run-android --configuration=release (Be sure to uninstall other versions on device first!)
- Head to the dev console to manage apk updates https://play.google.com/apps/publish/

#Todos
- App intro - Look into dynamic routing so only when no data (i.e. first time with app) ==> Use a splash/loading looking screen and route to intro or home based on component did mount check of whether the all countries store exists
- Work on caching permissions (Settings information saved in store)
- Current weather for capital
- Create better 'stories' for our society data
- Gallery section?
- Settings page (rate app)
