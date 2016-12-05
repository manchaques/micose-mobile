# Mobile version of Micose
The new reference for Comics' bookshelves.

# Contributing
## Overview
This project uses [React Native](https://facebook.github.io/react-native/) and [Redux](http://redux.js.org/) through react-redux.   
So, you should read the presentation of *["Presentational and Container components"](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.2wiycwces)* and the Redux tutorial *["Usage with React"](http://redux.js.org/docs/basics/UsageWithReact.html#usage-with-react)* to understand the ins and outs of the architecture of Micose Mobile.


## Tips and tricks
### Generate the signed apk
```
cd android && ./gradlew assembleRelease
```
The .apk is generated in `android/app/build/outputs/apk/` and named `app-release.apk`
