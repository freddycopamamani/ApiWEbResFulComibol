/*const mongoose = require('mongoose');
const app = require('../app');
const port = process.env.PORT || 4000;
const { API_VERSION, IP_SERVER, PORT_DB } = require('../config');

mongoose.set("useFindAndModify", false);

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/ComibolDB`,
 {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
     if(err) {
         throw err;
     } else {
         console.log("La conexion a la base de datos es correcta.");

         app.listen(port, () => {
             console.log("################################")
             console.log("############ API REST ##########")
             console.log("################################")
             console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
         })
     }
 })*/
 //index js solo sirve para que arranque la aplicacion
 
 import app from './app';
 import './database'
 app.listen(4000);
 console.log('Server listen on port', 4000)