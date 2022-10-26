const mongoose = require('mongoose');
/* import mongoose from 'mongoose' */

const URI = 'mongodb://localhost/animal';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))

module.exports = mongoose;