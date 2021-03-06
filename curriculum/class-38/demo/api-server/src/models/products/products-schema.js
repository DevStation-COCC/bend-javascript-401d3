'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose); //makes the schema available 

const products = mongoose.Schema({
  name: { type:String, required:true },
  description: { type:String },
  price: { type:Number, required:true },
  category: {type:String, required:true},
});

module.exports = mongoose.model('products', products );
