const Form = ({ children, onSubmit }) => {
     return (
          <div className='flex justify-center items-center bg-slate-200 h-screen'>
               <form
                    onSubmit={onSubmit}
                    className='bg-green-900 flex flex-col gap-4 p-5 rounded-sm w-4/12 text-white'
               >
                    {children}
               </form>
          </div>
     );
};

export default Form;
