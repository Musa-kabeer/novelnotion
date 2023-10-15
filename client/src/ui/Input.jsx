const Input = ({ type, id, onChange, defaultValue }) => {
     return (
          <input
               type={type}
               id={id}
               className='w-64 px-2 text-xs rounded-sm outline-none'
               onChange={onChange}
               defaultValue={defaultValue}
          />
     );
};

export default Input;
