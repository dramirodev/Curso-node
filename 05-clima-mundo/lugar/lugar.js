const axios = require('axios');

const getLugar = async (direccion) => {
const encodeUrl = encodeURI(direccion);

const instance = axios.create({
    "url": `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,
    "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
        "x-rapidapi-key": "3b00dd8e62mshf4edb3a3af05b6cp1d69f7jsn27e2bdf072cc"
    }
});

    const respuesta = await instance.get();

    if (respuesta.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }
    const data = respuesta.data.Results[0]

    return {
        direccion: data.name,
        lat: data.lat,
        long: data.lon
    }
}

module.exports = {getLugar};
