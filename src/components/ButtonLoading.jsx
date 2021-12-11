import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text, onClick = () => {} }) => {
  return (
    <button
      data-testid='button-loading'
      onClick={onClick}
      disabled={disabled}
      type='submit'
      className='px-6 py-3 my-2 text-lg font-bold text-white bg-blue-700 shadow-md rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:bg-gray-700'
    >
      {loading ? <ReactLoading data-testid="loading-in-button" type='spin' height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;