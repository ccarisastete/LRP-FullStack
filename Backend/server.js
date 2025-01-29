const { port , origin } = require('./src/config/config')
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const apiKeyRoutes = require('./src/routes/apiKey');

const app = express();
connectDB();

app.use(
  express.json(),
  cors({
    origin: origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Si usas cookies o encabezados de autenticación
  })
);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/apiKey',apiKeyRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});