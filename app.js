const express = require("express");

const app = express();
const {API_VERSION} = require('./config');

const cooperativasRoutes = require('./routers/cooperativas');
const bocaminasRoutes = require('./routers/bocaminas');
const sociosRoutes = require('./routers/socios');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/${API_VERSION}`, cooperativasRoutes);
app.use(`/api/${API_VERSION}`, bocaminasRoutes);
app.use(`/api/${API_VERSION}`, sociosRoutes);

module.exports = app;