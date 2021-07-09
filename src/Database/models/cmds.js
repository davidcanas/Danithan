const { Schema } = require('mongoose');

module.exports = new Schema({   
  
        name: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        category: {
          type: String
        }
      
}, { 
    versionKey: false
});