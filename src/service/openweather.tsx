var axios = require("axios").default;

const options = {
    apiKey: process.env.REACT_APP_API_KEY,
    URL: process.env.REACT_APP_API_DOMAIN,
    }
export function getCityInfos(latLng: any): any {     
    return axios.get(`https://${options.URL}current?lat=${latLng.lat}&lon=${latLng.lng}&key=${options.apiKey}&lang=pt`)
}
