import { NavLink } from 'react-router-dom';

const NavLinkComponent = ({ to, text, icon }) => {
 const raw =
  'px-2 py-2 md:px-4 md:py-4 bg-neutral-500 text-neutral-100 text-xs hover:border-l-2 border-l-neutral-800 transition-all duration-200 flex items-center gap-2';

 const active = raw + ' border-l-2 border-l-neutral-800';

 return (
  <NavLink to={to} className={({ isActive }) => (isActive ? active : raw)}>
   {icon} <span className=' md:flex'>{text}</span>
  </NavLink>
 );
};

export default NavLinkComponent;
