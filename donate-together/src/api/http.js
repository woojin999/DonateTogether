import axios from 'axios';

function create(baseURL,options) {
  const  instance = axios.create(
    Object.assign({
      baseURL:baseURL,
    }),
    options,
  );
  return instance;
}
export const donates = create('http://localhost:8001/donates/');