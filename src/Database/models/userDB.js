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
    type: Boolean,
    default: false
  },
  motivo: {
    type: String,
   default: undefined
  },
  horaBlacklist: {
    type: String,
    default: undefined
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