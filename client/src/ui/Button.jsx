const Button = ({ children, onClick, mode }) => {
     return (
          <button
               onClick={onClick}
               className={`uppercase px-3 py-1 rounded-sm text-[10px] text-neutral-100 bg-neutral-500 ${
                    mode ? 'cursor-not-allowed' : 'cursot-pointer'
               }`}
          >
               {children}
          </button>
     );
};

export default Button;
