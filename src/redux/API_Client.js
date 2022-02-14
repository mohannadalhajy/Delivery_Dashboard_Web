const axios = require('axios');

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export const get = (URL) => {
  return axios.get(URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'

    }});
};
export const getByIdTwoParams = (URL, id1, id2) => {
  return axios.get(`${URL}/${id1}/${id2}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};
export const getById = (URL, id) => {
  return axios.get(`${URL}/${id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};
export const exportExcel = (URL, body) => {
  return axios.post(URL, body, {
    headers: {
      responseType: 'arraybuffer'
    }
  });
};
export const post = (URL, body) => {
  return axios.post(URL, body);
};
export const put = (URL, body, id) => {
  return axios.put(`${URL}/${id}`, body);
};
export const patch = (URL, body, id) => {
  return axios.patch(`${URL}/${id}`, body);
};
export const patchTwoParams = (URL, body, id1, id2) => {
  return axios.patch(`${URL}/${id1}/${id2}`, body);
};
export const patchWithoutId = (URL, body) => {
  return axios.patch(URL, body);
};
export const deleteItem = (URL, id) => {
    return axios.delete(`${URL}/${id}`);
};
export const deleteAll = (URL) =>{
  return axios.delete(URL)
}

export const deleteItemTwoParams = (URL, id1, id2) => {
    return axios.delete(`${URL}/${id1}/${id2}`);
};
export const putWithoutId = async(URL, body) => {
  const response = await axios.put(URL, body);
  const data = response.data;
  return data;
};
export const upload_image = (URL, image) => {
  return axios.post(URL, image, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${image._boundary}`,
    }
  });
};
