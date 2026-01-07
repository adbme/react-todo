import React from 'react';

interface OptionButtonProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
    
}

const InputDate = ({
    value,
    className = '',
    ...props
}: OptionButtonProps) => {
    return (
    
        <input
  type="date"
className='focus:bg-black focus:text-white bg-gray-100 py-2 px-4 rounded-full hover:bg-gray-200 cursor-pointer'
  value={value}
/>
    );
};

export default InputDate;