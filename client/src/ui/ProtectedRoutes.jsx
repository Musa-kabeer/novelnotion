import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoutes = ({ children }) => {
     const navigate = useNavigate();

     return <div>{children}</div>;
};

export default ProtectedRoutes;
