const { Schema} = require('mongoose');

module.exports = new Schema({  
    guildID: {
        type: String,
        required: true
    },
    prefix: {
        type: String
    },
    roleID: {
        type: String
    },
    welcomeChatID: {
        type: String
    },
      welcomeChatMessage: {
        type: String
    },
    disabledCmds: {
        type: Array
    },
    djrole: {
        type: String
    },
    Settings: {
        lang: {
            type: String,
            default: "pt-BR"
        },
        gay: {
            type: Boolean,
            default: false
        },
    }
}, { 
    versionKey: false
});

