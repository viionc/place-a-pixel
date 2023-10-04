# place-a-pixel
Small practice with express.js and socket.io

From /place-a-pixel directory run command:

```js
npm start
```

Which runs a npm-run-all command that will start both server and client

```js
"server": "nodemon server/index.js",
"client": "cd ./client && npm start",
"start": "npm-run-all --parallel server client"
```
