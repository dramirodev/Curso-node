const axios = require('axios');

const getClima = async (lat, long) => {
    const api_Key = '4dd1ebadf5912259c7ef32345c177ef9';
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_Key}&units=metric`;

    const respuesta = await axios.get(api_url);

    return respuesta.data.main.temp
}

module.exports = {
    getClima
}
