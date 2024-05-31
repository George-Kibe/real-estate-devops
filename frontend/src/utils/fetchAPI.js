import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-key': '722c009ab6msh7a58231251b38fbp10610ajsn7cf4ce15b860',
            'x-rapidapi-host': 'bayut.p.rapidapi.com'
          }
    })
    return data;
}