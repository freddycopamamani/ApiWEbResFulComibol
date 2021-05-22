/*const express = require("express");

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

module.exports = app;*/

//app.js sirve tan solo para configurar la aplicacion  express

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pkg from '../package.json';

import expiredTokenRoutes from './routes/expiredToken.routes';
import coop_Routes from './routes/cooperativas.routes'
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import {createRoles} from './libs/initialSetup';
import BocaminasRoutes from './routes/bocaminas'
import sociosRoutes from './routes/socios';
import router from './routes';



 
 const app = express();
 createRoles();
 app.set('pkg', pkg);
 app.use(morgan('dev'));
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 

 app.get('/', (req, res) => {
     res.json({
         name: app.get('pkg').name,
         author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
     })
 })


 app.use(expiredTokenRoutes);
 app.use('/cooperativas', coop_Routes);
 app.use('/auth', authRoutes);
 app.use('/users', userRoutes);
 app.use('/bocaminas', BocaminasRoutes);
 app.use('/socios', sociosRoutes);
 app.use('/api', router);

 export default app;
