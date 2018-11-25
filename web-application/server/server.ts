import app from './app';

const SERVER_PORT = 4201;

app.listen(SERVER_PORT, () => {
  console.log('Express server listening on port ' + SERVER_PORT);
});
