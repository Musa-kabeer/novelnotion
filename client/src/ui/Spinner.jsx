import { RotatingLines } from 'react-loader-spinner';
import { useDarkMode } from '../context/darkModeContext';

const Spinner = ({ w, d, sw }) => {
     const { darked } = useDarkMode();

     const sc = darked ? '#f5f5f5' : '#434343';

     return (
          <RotatingLines
               strokeColor={sc}
               strokeWidth={sw}
               animationDuration={d}
               width={w}
               visible={true}
          />
     );
};

export default Spinner;
