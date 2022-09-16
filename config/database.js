const mongoose = require('mongoose');

const database = process.env.MONGODB_URI.replace("<DATABASE>", process.env.DATABASE_NAME);


mongoose.connect(database)
.then(console.log('database connected successfully') )
.catch(er => { throw er } );