import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const ProtectedRoutes = ({ children }) => {
     const navigate = useNavigate();
     const [cookies] = useCookies();

     useEffect(() => {
          if (!cookies.novelToken || cookies.novelToken === 'loggedout')
               navigate('/login', { replace: true });
     }, [cookies, navigate]);

     return <div>{children}</div>;
};

export default ProtectedRoutes;
