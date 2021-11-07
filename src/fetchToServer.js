const SERVER_URL = '127.0.0.1:80';
const axios = require('axios').default;

const serialize = (bodyParams)=>{
  let params = '';
    Object.keys(bodyParams).forEach((key)=>{
        params += key + "=" + bodyParams[key] + '&';
    });
    return params;
}

export const fetchToServer = async(endpoint,bodyParams) => {
    let params = serialize(bodyParams);
    
    const requestOptions = {
      url: `${SERVER_URL}/${endpoint}?${params}`,
      headers:{
              'Content-Type':'text'
          },
    };
    try {
      const response = await axios.get(requestOptions.url, requestOptions.headers);
      return response;
  } catch(e){ //error
      throw(e)
  }
};
