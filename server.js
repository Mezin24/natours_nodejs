const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`Listenong on a port ${port}`);
});
