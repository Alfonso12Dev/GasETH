const { MessageEmbed } = require("discord.js");
const getGas = require("../system/getGas");
const mark = "`";

module.exports.run = async (bot, message) =>{

const gas = new getGas(bot);
const data = await gas.getFastGasPrice();

const embed = new MessageEmbed()
.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({ dynamic: true }) })
.addFields({ name: "Nueva notificación", 
value: `
- ⚡ | Rápido: ${mark+data.fast+mark} gwei
- 🐝 | Lento: ${mark+data.regular+mark} gwei
- 🐢 | Muy lento: ${mark+data.cheap+mark} gwei
`
})
.setColor("RANDOM")
.setThumbnail(!message.guild.splashURL({ size: 2048, format: "jpg" }) ? message.guild.iconURL({ size: 2048, format: "jpg" }) : message.guild.splashURL({ size: 2048, format: "jpg" }))
.setTimestamp()
.setFooter({ text: message.author.username, iconURL: message.author.avatarURL({ dynamic: true }) });

//<-Enviamos el embed-> 
message.channel.send({ embeds: [embed] });
}