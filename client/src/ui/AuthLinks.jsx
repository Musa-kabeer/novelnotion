import { Link } from 'react-router-dom';

const AuthLinks = () => {
     return (
          <>
               <Link to='/login'>Log in</Link>
               <Link to='/sign-up'>Sign up</Link>
          </>
     );
};

export default AuthLinks;
