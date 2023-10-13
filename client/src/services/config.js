export const API_URL = 'https://novelnotionapi.onrender.com/api/v1';
// export const API_URL = 'http://localhost:3000/api/v1';

export const EMAIL_PATTERN = /\S+@\S+\.\S+/;

export const timeout = async (s) => {
     setTimeout(() => {
          return new Promise((_, reject) => {
               reject(`Request took too long. ${s} seconds`);
          });
     }, s * 1000);
};
