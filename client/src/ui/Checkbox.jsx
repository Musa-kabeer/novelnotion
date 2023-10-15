const Checkbox = ({ label, name, category, onChange }) => {
     return (
          <li className='flex gap-2 text-sm'>
               <input
                    className='accent-neutral-500 text-green-50'
                    type='checkbox'
                    name={name}
                    value={name}
                    id={name}
                    checked={category === name}
                    onChange={onChange}
               />
               <label htmlFor={name}>{label}</label>
          </li>
     );
};

export default Checkbox;
