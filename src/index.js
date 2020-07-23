require('dotenv').config();

const express = require('express');
const ngrok = require('ngrok');

const app = express();

let ngrokServer;

app.get('/', (req, res) => {
  if (!ngrokServer) res.send('server off');

  res.send(ngrokServer.server);
});

app.listen(process.env.PORT, async (err) => {
  try {
    if (err) throw err;

    ngrokServer = {
      server: await ngrok.connect({
        proto: process.env.NGROK_PROTO,
        addr: process.env.NGROK_PORT,
        authToken: process.env.NGROK_TOKEN
      }),
      api: ngrok.getApi()
    }

    console.log(`🚀 Server running on ${process.env.PORT}`);
  } catch (err) {
    throw err;
  }
});
