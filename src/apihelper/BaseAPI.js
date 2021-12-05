import axios from 'axios';
const config = {
  headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  }
}

const API = {
  makeGetRequest(path, callback) {
    console.log('makeGetRequest111', path)
    axios
      .get(path)
      .then(res => {
        console.log('makeGetRequest222', path, res.data)
        callback(res.data);
      })
      .catch(error => {
        extractError(error, path)
        callback({status: -1});
      });
  },

  makePostRequest(path, params, callback) {
    console.log('makePostRequest11', path, JSON.stringify(params))
    axios({
      method: 'post',
      url: path,
      data: params,
    })
      .then(res => {
        console.log('makePostRequest22', path,res.data)
        callback(res.data);
      })
      .catch(error => {
        extractError(error, path)
        callback({status: -1});
      });
  },

  makePostRequestFormData(path, params, callback) {
    console.log('makePostRequestFormData1111', path,params)
    var bodyFormData = new FormData();
    Object.keys(params).forEach(key =>{
      bodyFormData.append(key, params[key]);
    })
    axios({
      method: 'post',
      url: path,
      data: bodyFormData,
      headers: {"Content-Type": "multipart/form-data" },
    })
      .then(res => {
        console.log('makePostRequestFormData222', path,res.data)
        callback(res.data);
      })
      .catch(error => {
        extractError(error, path)
        callback({status: -1});
      });
  },

};




const extractError = (error, url) => {
  // Error 😨
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log('Erroring Url ===>',url);
    console.log('error.response.data', error.response.data);
    console.log('error.response.status',error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log('error.request', error.request);
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log('error.message', error.message);
  }
  console.log('error.config', error.config);
};

export default API;
