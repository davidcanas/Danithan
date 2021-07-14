const mongoose = require('mongoose');

module.exports = new mongoose.Schema({   
  
        name: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        category: {
          type: String
<<<<<<< HEAD
        },
        aliases: {
          type: Array
        }
=======
        }, 
      aliases: {
      type: Array
      }
>>>>>>> 60025f071c3bc4defe6b840e7df0d049f044ca8b
      
}, { 
    versionKey: false
});
