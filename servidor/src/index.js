require('dotenv').config();
const express = require('express')
const cors = require('cors');
const db = require('./config/db');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
