
## Features
* Live Closed Captioning
* Real-time Transcription
* Video conferencing with real-time video and audio
* Enable/Disable camera
* Mute/unmute mic
* Screen sharing
* Dominant Speaker indicator
* Network Quality Indicator

## Browser Support
This application is supported only on Google Chrome.


The local token server is managed by [server.js](https://github.com/symblai/symbl-video-react/blob/master/server.js)

Run the app locally with

    $ npm start

This will start the local token server and run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to see the application in the browser.

The page will reload if you make changes to the source code in `src/`.
You will also see any linting errors in the console. Start the token server locally with

    $ npm run server

The token server runs on port 8081 exposes two `GET` endpoints. One to generate access token for Symbl and one for generating access token for Twilio. 

Symbl token endpoint expects `GET` request at `/symbl-token` route with no parameters.

T
### Multiple Participants in a Room

If you want to see how the application behaves with multiple participants, you can simply open `localhost:3000` in multiple tabs in your browser and connect to the same room using different user names.

Additionally, if you would like to invite other participants to a room, each participant would need to have their own installation of this application and use the same room name and Account SID (the API Key and Secret can be different).

## Dependencies

```json
  "dependencies": {
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/styles": "^4.10.0",
    "@primer/octicons-react": "^10.0.0",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "clsx": "^1.1.1",
    "concurrently": "^5.1.0",
    "d3-timer": "^1.0.10",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "fscreen": "^1.0.2",
    "is-plain-object": "^4.1.1",
    "lodash-es": "^4.17.15",
    "lodash.throttle": "^4.1.1",
    "moment": "^2.27.0",
    "node-fetch": "^2.6.0",
    "react": "^16.13.1",
    "react-copy-to-clipboard": "^5.0.2",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.1",
    "twilio": "^3.48.1",
    "twilio-video": "^2.7.1"
  }
```

