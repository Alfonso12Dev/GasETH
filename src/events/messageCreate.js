const prefix = require("../config/config.json")
const info = prefix.prefix;

module.exports = (client, message) => {

if(message.author.bot) return;
    
if(message.content.indexOf(info) !== 0) return;

const args = message.content.slice(info.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
const cmd = client.commands.get(command);
    
if(!cmd) return;
    
cmd.run(client, message, info);
};