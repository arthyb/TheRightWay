The Right Way App
---
The Right Way Application using the following technology stack trace 

1. AngularJS
2. PhoneGap 3.6.3 
3. Cordova
4. SASS
5. jQuery


Features

1. Automatic insertion of app scripts into index.html.
2. Configuration data is picked from the config json files and converted to an angular constants module.
3. All js files are linted using jshint.
4. Livereload support.
6. Minification, concatenation of files for deployment.

To use this,

1. Install the dependencies node, bower, grunt and sass.
2. Download the repository.
3. Run `npm install` on the repo location.
4. Use the below commands to run the application.



The cli commands are

```
 1. grunt 
    
        Will build the application.
 
 2. grunt watch 
    
        Watch changes to the application files and rebuild.
 
 3. grunt dist
   
        Will compile the application in distribution mode and startup a server.
 
 4. grunt server
 
        Will start up a server and run the dev version of the application. Use this along with the `grunt` command for the server to reload automatically based on the changes to the application.
```

Run these 2 commands on 2 separate terminals during development - `grunt`, `grunt server`. These commands will rebuild the application for every change in the application and automatically reload the server.

The folder structure is as the following

```
- app
  Contains all the application files. Controller, Directives, Services.. etc are put in separate
  files in their respective folders.
  The naming convention of these files are based on the url inside the router.js.
  For filters, the name of the file is its name hyphentated.

- public
   This folder contains all the files that should not be processed such as images, fonts.
   The contents in this folder will be copied and deployed.
   These resources can be assets via '/' inside your application.
```

To install external dependicies such as Jquery, add the depenedency to bower.json and run the command `bower install`.
The js file to be used in the application should be added to the vendorFiles object inside the `grunt/vendor.json` file.
The css files should be copied into the `styles/sass` folder and renamed with and `_`+name of the file`.scss`. This file should be included into `app.scss`.
The assets that come with the dependency should be added into the `public/assets/` folder.


Cordova (Platform specific build)
-

Android: Copy the updated files and paste it in to the following Android specific path:
```
native/FordCompliance/platforms/android/assets/www
```


IOS: Copy the updated files and paste in to the following IOS Specific path:

```
native/FordCompliance/platforms/ios/www
```
