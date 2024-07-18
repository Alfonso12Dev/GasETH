//<-Constantes principales a utilizar-> 
const Discord = require('discord.js')
const { Intents } = Discord, colors = require("colors");
const getGas = require("./src/system/getGas");

const client = new Discord.Client(
{ 
    intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
 ]}
)
const fs = require("fs");

//<-Cuando el bot arranque, ejecutará lo siguiente-> 
client.on('ready', async () => {
    
//<-Imprimimos en consola que encendió el bot-> 
console.log(`[✔]`.green + ' El bot ha encendido '+ `exitosamente`.green+`...`)

const gasInstance = new getGas(client);

//Obtenemos los datos del gas y lo almacenamos en la instancia
await gasInstance.getGas();

//Actualizar el estado del bot periódicamente
setInterval(async () => {

await gasInstance.getGas();
gasInstance.updateBotStatus();

}, 1 * 60000); //Agregamos como cooldown 1 minuto, puedes agregar cuánto tiempo desees en MS

});

client.commands = new Discord.Collection()

//<-Abrimos los eventos que están alojados en su respectiva carpeta->
fs.readdir("./src/events/", (_err, files) => {
console.log(`(INFO)`.inverse.cyan + `- ❗ -`+ `Eventos Cargados`.strikethrough.cyan);
files.forEach((file) => {
if(!file.endsWith(".js")) return;
const event = require(`./src/events/${file}`);
let eventName = file.split(".")[0];
client.on(eventName, event.bind(null, client));
delete require.cache[require.resolve(`./src/events/${file}`)];
})});

//<-Abrimos los comandos que están alojados en su respectiva carpeta->
fs.readdir("./src/commands/", (_err, files) => {
console.log(`(INFO)`.inverse.cyan + `- ✅ -`+ `Comandos Cargados`.strikethrough.cyan);
files.forEach((file) => {
if(!file.endsWith(".js")) return;
let props = require(`./src/commands/${file}`), commandName = file.split(".")[0];
client.commands.set(commandName, props);
})});

//<-El bot inicia sesión, con el token definido en config.json-> 
client.login(process.env.TOKEN);