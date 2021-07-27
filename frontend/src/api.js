import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
  retries: 3,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
});

const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

let $axios = axios.create({
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

$axios.defaults.baseURL =
  process.env.VUE_APP_API_URL || "http://202.92.153.75/api/v1/";

// "http://202.92.153.75/api/v1/" || process.env.VUE_APP_API_URL;
$axios.defaults.baseStaticURL =
  process.env.VUE_APP_STATIC_URL || "http://202.92.153.75/static/";

// "http://202.92.153.75/static/" || process.env.VUE_APP_STATIC_URL;
export default {
  getStaticURL() {
    return $axios.defaults.baseStaticURL;
  },
  getBaseURL() {
    return $axios.defaults.baseURL;
  },
  fetchResource() {
    return $axios.get(`resource/xxx`).then((response) => response.data);
  },

  fetchSecureResource() {
    return $axios.get(`secure-resource/zzz`).then((response) => response.data);
  },
  getLongTask(task_id) {
    return $axios.get(`longtask/${task_id}`).then((response) => response.data);
  },
  getPredResults(task_id) {
    return $axios.get(`predict/${task_id}`);
  },
  postLongTask() {
    return $axios.post("longtask/").then((response) => response.data);
  },
  getPredTools() {
    return $axios.get("predict/tools");
  },
  postFasta(data) {
    return $axios
      .post("predict/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  getProteins(query) {
    return $axios
      .get("proteins/", {
        params: query,
        timeout: 100000,
      })
      .then((response) => response.data);
  },
  getDownloadableProteins(query) {
    return $axios
      .get("proteins", {
        params: query,
        timeout: 100000,
      })
      .then((response) => {
        let DOGGO = new Blob([response], { type: "application/x-tar" }),
          url = window.URL.createObjectURL(DOGGO);
        window.open(url);
      });
  },
  getDownloadable(name) {
    return $axios
      .get(`files/datasets/prediction/${name}`)
      .then((response) => response);
  },
  getDownloadableFasta(query) {
    return $axios
      .get(`files/tmeval-datasets/${query.name}`, {
        params: query.parameters,
        timeout: 100000,
      })
      .then((response) => {
        let DOGGO = new Blob([response], { type: "application/x-tar" }),
          url = window.URL.createObjectURL(DOGGO);

        window.open(url);
      });
  },
  getAssessment(seqId, set) {
    if (set) {
      return $axios
        .get(`assessment/${seqId}/${set}/`)
        .then((response) => response.data);
    } else {
      return $axios
        .get(`assessment/${seqId}`)
        .then((response) => response.data);
    }
  },
  getJobs() {
    return $axios.get("jobs/").then((response) => response.data);
  },
};
