import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost/ComibolDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Base de datos Conectado'))
.catch(error => console.log(error))