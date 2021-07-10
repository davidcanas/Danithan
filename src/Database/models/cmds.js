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
        }, 
      aliases: {
      type: Array
      }
      
}, { 
    versionKey: false
});
