const app = require('./app');
const connectDB = require('./config/db');

const PORT = 3016;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Adoption Request List Service running on port ${PORT}`);
  });
});
