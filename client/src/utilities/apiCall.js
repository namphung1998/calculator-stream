const API_URL = process.env.API_URL || 'http://localhost:4000';

export const apiCall = (path, params) => {
  return fetch(API_URL + path, params).then(res => res.json());
}