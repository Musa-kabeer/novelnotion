import { useCookies } from 'react-cookie';

export const getCookie = (name) => {
 const [cookies] = useCookies();

 return cookies[name];
};
