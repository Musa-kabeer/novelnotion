import { Link } from 'react-router-dom';

const Logo = ({ fz }) => {
     return (
          <Link
               to={'/'}
               className={`${
                    fz ? 'text-[25px]' : 'text-2xl'
               } text-[17px] font-bold italic md:text-2xl dark:text-neutral-100`}
          >
               NovelNotions
          </Link>
     );
};

export default Logo;
