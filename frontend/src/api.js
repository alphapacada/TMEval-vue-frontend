import axios from 'axios'



const API_URL = 'http://localhost:5000';
let $axios = axios.create({
  baseURL: 'http://192.168.1.6:5000/api/v1/',
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
    },
    getLongTask(task_id) {
      return $axios.get(`longtask/${task_id}`)
        .then(response => response.data)
    },
    postLongTask() {
      return $axios.post('longtask/')
        .then(response => response.data)

    },
    getPredTools() {
      return $axios.get('predict/tools')
      .then(response => response.data)
    },
    postFasta(data) {
      return $axios.post('predict/', data)
      .then(response => { 
        console.log(response)
        if(response.status === 201) {
          this.$router.push({ path : '/'})
        }
      })
      .catch(error => {
          console.log(error.response)
      });
    }

    // headers: { 'Access-Control-Allow-Origin': true }
    //github.com/axios/axios#handling-errors
    // axios.put(this.apiBaseEndpoint + '/' + id, input)
    //   .then((response) => {

    //   })
    //   .catch(error) => {
    //     if (error.response) {

    //     } else if (error.request) {
    //       console.log(error.request)
    //     } else {
    //       console.log('Error', error.message);

    //     }
    //     console.log(error.config)
    //   });
    

  }