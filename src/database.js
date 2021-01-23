const mongoose = require ('mongoose');


const URI = 'mongodb://localhost/tareas';

 mongoose.connect(URI)
 .then (db => console.log('DB esta conectado'))
 .catch(err => console.error(err));

module.exports = mongoose;