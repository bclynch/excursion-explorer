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

#Maps
- When installing maps follow this page https://github.com/airbnb/react-native-maps/blob/master/docs/installation.md
- Running $ react-native link should do most of the job
- Build errors dexdebug might be solved by the following:
  - cd into project_folder/android
  - $ gradlew clean
  - cd back to project_folder then react-native run-android
- To function on the emulator make sure the target of the emulator is Google APIs Intel x86 Atom System Image. Also be sure Google Play Services + Google Repository installed

#Todos
- Zoom into location on result press for destinations maps
- Overall app cohesion with color scheme/style (passed down from props)
- Check on validation and fallback for errors (better visuals when no data available or none)
- App intro - Look into dynamic routing so only when no data (i.e. first time with app) ==> Use a splash/loading looking screen and route to intro or home based on component did mount check of whether the all countries store exists
- Work on caching permissions (Settings information saved in store)
- Create legend prop for graph component
- Create better 'stories' for our society data
- Gallery section?
- Settings page (about, clear memory (check), rate app, unit settings (check))
