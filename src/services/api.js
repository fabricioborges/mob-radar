import axios from 'axios';

const api = axios.create({
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
});

export default api;    