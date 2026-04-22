const express = require('express');
const app = express();
const apiRoutes = require('./routes/Routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(apiRoutes);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
});

module.exports = app;