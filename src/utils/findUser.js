async function findUser(arg) {
  let user;
    if (!isNaN(arg) && (arg.length === 17 || arg.length === 18 || arg[0].length === 19)) {
        try {
            user = this.client.users.get()
                ? this.client.users.get(arg) 
                : await this.client.getRESTUser(arg);
        }catch {}   
    }

    if (!user) {
        const member = guild.members.find(m => m.displayName === args.join(' ')) 
            || guild.members.find(m => m.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase()));

        if (member) user = member.user;
    }
    return user;
}
