import axios from 'axios'



const API_URL = 'http://localhost:5000';
let $axios = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
})
// https://github.com/gtalarico/flask-vuejs-template/blob/master/src/backend.js

export default {

    fetchResource () {
      return $axios.get(`resource/xxx`)
        .then(response => response.data)
    },
  
    fetchSecureResource () {
      return $axios.get(`secure-resource/zzz`)
        .then(response => response.data)
    }
  }