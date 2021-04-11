const { Schema } = require("mongoose");

module.exports = new Schema({
    userID: {
        type: String,
        required: true
    },
    img: {
      type: String
    },
    sobremim: {
      type: String
    },
    blacklist: {
      type: Boolean
    },
    motivo: {
      type: String
    },
    superMercado: {
    dinheiro: {
      type: Number,
     default: 0
    },
    nome: {
      type: String
    },
    dono: {
      type: String
    },
    ativado: {
      type: Boolean,
     default: false
    },
    }
}, { 
    versionKey: false
});