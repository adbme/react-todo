import React from 'react';

interface OptionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // Pas besoin de redéclarer children !
}

const OptionButton = ({
    children,
    className = '',
    ...props
}: OptionButtonProps) => {
    return (
        <button 
            className={`transform transition-all duration-200 rounded-full active:scale-95 active:duration-75 py-2 px-6 cursor-pointer flex items-center justify-center gap-2 font-medium outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:bg-black focus:text-white ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default OptionButton;