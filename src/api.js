import axios from 'axios';
 const apiConfig = {
baseUrl: 'https://api.backendless.com/6AAA2A0D-9774-1914-FFC5-31A5295B8300/08E19BB9-1BF0-49B0-A515-D01F16133C53/', 
};
export  const api = axios.create({
  // withCredentials: true,
  baseURL: apiConfig.baseUrl,
  headers:  {'Content-Type': 'application/json'}
});
