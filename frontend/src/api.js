import axios from 'axios'

let $axios = axios.create({
        // baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000/api/v1/',
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        // credential: 'same-origin'
    })
    // https://github.com/gtalarico/flask-vuejs-template/blob/master/src/backend.js

$axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api/v1/'
export default {
    getBaseURL() {
        return $axios.defaults.baseURL;
    },
    fetchResource() {
        return $axios.get(`resource/xxx`)
            .then(response => response.data)
    },

    fetchSecureResource() {
        return $axios.get(`secure-resource/zzz`)
            .then(response => response.data)
    },
    getLongTask(task_id) {
        return $axios.get(`longtask/${task_id}`)
            .then(response => response.data)
    },
    getPredResults(task_id) {
        return $axios.get(`predict/${task_id}`)
    },
    postLongTask() {
        return $axios.post('longtask/')
            .then(response => response.data)

    },
    getPredTools() {
        console.log("baseUrl", $axios.defaults.baseURL);
        console.log("sample", process.env.VUE_APP_SAMPLE);
        console.log("env", process.env.NODE_ENV)
        return $axios.get('predict/tools')
    },
    postFasta(data) {
        return $axios.post('predict/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'

                }
            })
            .then(response => response.data)
            // .catch(error => error.response)
            //     { 
            //     // 
            //     console.log("error")
            //     console.log(error)
            // })
    },
    getProteins(query) {
        console.log('backend: ', query);
        return $axios.get('proteins', {
                params: query,
                timeout: 100000
            })
            .then(response => response.data)
    },
    getDownloadableProteins(query) {
        console.log('backend: ', query);
        return $axios.get('proteins', {
                params: query,
                timeout: 100000
            })
            .then(response => {
                console.log("success")
                let DOGGO = new Blob([response], { type: 'application/x-tar'}),
                url = window.URL.createObjectURL(DOGGO)
                window.open(url)
            })
    },
    getDownloadable(name) {
        return $axios.get(`files/datasets/prediction/${name}`)
            .then(response => response)
    },
    getDownloadableFasta(query) {
        console.log(query.name)
        console.log(query.parameters)
        return $axios.get(`files/tmeval-datasets/${query.name}`, {
            params: query.parameters,
            timeout: 100000
        })
            .then(response => {
                console.log("success")
                let DOGGO = new Blob([response], { type: 'application/x-tar'}),
                url = window.URL.createObjectURL(DOGGO)
        
                window.open(url)
            })
    },
    getAssessment(seqId, set) {
        return $axios.get(`assessment/${seqId}/${set}`)
            .then(response => response.data)
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