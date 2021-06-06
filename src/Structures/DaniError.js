module.exports = class DanithanError extends Error {
    constructor(message) {
      super(message)
      this.name = "DanithanError"
    } 
  }