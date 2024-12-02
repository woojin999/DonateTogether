import { FaSpinner } from 'react-icons/fa';

function Button({ children, className, onClick ,loading =false }) {
  const clazz = [
    'bg-stone-800 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    className,
  ].join(' ');
  const handleClick = () => {
    if (loading) {
      return;
    }
    onClick();
  };
  return (
    <button className={clazz} onClick={handleClick} disabled={loading}>
      <span className='flex items-center justify-center'>
        {loading && <FaSpinner className='animate-spin mr-2'/>}
        {children}
      </span>
    </button>
  );
}

export default Button;
