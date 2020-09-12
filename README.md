# Get Weather app

## Table of Contents

- [About the Project](#about-the-project)
- [Installing Instructions](#installing-instructions)
- [Service Worker](#service-worker)
- [ Hosting on Firebase ](#hosting-on-firebase)
- [Credits](#credits)
- [License](#license)

## About the Project

This project is to build a weather app where users can get weather information in real-time.

- website meet PWA criteria
  - Register a service worker and provide offline access to cached weather searches.
  - Web app have manifest in order for it to be installed on the user’s device.
  - Web app meet the web accessibility guidelines
- user-friendly interface
- Responsive on all screens
- Local Storage in order to make the weather results persist on the page when a user reloads
- Fetched weather from openweathermap API.
- Built a autocomplete for places from Algolia Places API.
- Using an error handling messages to improve the user experience.

## Installing Instructions

1- download zip folder or clone project > https://github.com/sarah27h/get-weather.git

`git clone https://github.com/sarah27h/get-weather.git <add-your-project-name>`

2- Open Github and create new repo.

3- Remane the old repo upstream & change the local repo 'origin' that points to new repo.

```
git remote rename origin upstream
git remote add origin http://github.com/YOU/YOUR_NEW_REPO

```

4- To get changes from upstream `git fetch upstream`.

5- Install all project dependencies `npm install`.

6- cd to your project directory.

    - For develoment mode `gulp`.

    - For production `gulp build --production`.

## Service Worker

Note: In sw.js file change files paths in const assets = [] according to the enviroment to avoid getting `Uncaught (in promise) TypeError: Request failed` error

- for dev css, js files are '/css/mainStyle.css', '/js/all.js'
- for production css, js files are '/css/mainStyle.min.css',

## Hosting on Firebase

1- Create account on firebase.

2- create new project from firebase console.

3- Click on hositing in left menu and follow instructions.

- Open command prompt and cd to your project.
- `npm install -g firebase-tools`
- `firebase login`
  note: If you log in you have to log out to get your new project add to projects list and log in again.

4- initalize new project `firebase init`

- yes
- hositing using (down arrow, space, enter)
- choose your project.
- choose production directory in my case dist
- no

5- `firebase deploy`

note: if you make changes after deploy and want to update the depolyed project use `firebase deploy`.

## Credits

- Weather data from openweathermap API
- autocomplete search box for places by Algolia Places API.
- https://developer.mozilla.org/en-US/
- Net Ninja youtube channel.
- wW3schools.com
- Quicksand font from Google Fonts.

## License

This project is licensed under the terms of the <a href="https://choosealicense.com/licenses/mit/" rel="nofollow">MIT</a> license.
