const { Schema } = require('mongoose');

module.exports = new Schema({   
    botID: { 
        required: true,
        type: String
    },
    commands: {
        type: Number,
        default: 1
    },
    developers: {
        type: Array
    },
    cmds: {
        name: {
          type: String
        },
        description: {
          type: String
        },
        category: {
          type: String
        }
      }
}, { 
    versionKey: false
});