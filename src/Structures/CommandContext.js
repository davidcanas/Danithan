// Feito por MrLuisBR : https://github.com/MrLuisBR
module.exports = class CommandContext {
    constructor(client, msg, args, t, emoji, ) {
        this.client = client;
        this.msg = msg;
        this.args = args;
        this.t = t;
        this.emoji = emoji
        
      }
     async findUser(query) {
        let u
        try {
            u = this.client.users.get(query.replace(/[<>@!]/gi, "")) || await this.client.getRESTUser(query);
        } catch { }
        if (!u) return "Usuário não encontrado"
        u.tag = `${u.username}#${u.discriminator}`
        return u;
    }
    random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    MsToDate(ms){
  let seg = Math.floor(ms/1000)
  let minutes = 0
  let hours = 0
  let days = 0

  while (seg >= 60) minutes++, seg-=60
  while (minutes >= 60) hours++, minutes-=60
  while (hours >= 24) days++, hours-=24
  return {
   dias: days,
   horas: hours,
   minutos: minutes,
   segundos: seg
  }
}

}
