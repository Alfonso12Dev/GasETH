const fetch = require("node-fetch");
const colors = require("colors");

class Gas {
  constructor(client) {
    this.gasData = null; // Propiedad para almacenar los datos del gas
    this.client = client; // Bot de discord
    this.botStatus = ""; // Propiedad para almacenar el estado del bot
  }

  async getGas() {
    try {
      //<-Obtenemos el JSON de la siguiente API-> 
      const response = await fetch(`https://app.defisaver.com/api/gas-price/current`);
      const data = await response.json();
      
      this.gasData = { fast: data.fast, regular: data.regular, cheap: data.cheap };

      this.updateBotStatus();
      
      return this.gasData;
    } catch (error) {
      console.error(`(-) `.red+"Error al obtener los datos del gas: ", error);
      throw error;
    }
  }

getFastGasPrice() {

//Comprobamos que gasData no sea nulo antes de acceder a sus propiedades
if(!this.gasData) return null;

return this.gasData; 
  }

updateBotStatus() {

if(!this.gasData) return console.warn("No se ha obtenido los datos del gas");

const data = this.gasData;

//<-Actualizamos el estado, así se refleja el coste de gwei->
this.botStatus = `⚡⚡⚡ ${data.fast} / ⚡⚡ ${data.regular} / ⚡ ${data.cheap} gwei`;
this.client.user.setActivity(this.botStatus, { type: 'PLAYING' });

  }
}

module.exports = Gas;
