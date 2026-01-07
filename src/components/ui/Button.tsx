import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'fill' | 'outline';
    rounded?: 'normal' | 'full';
    children: React.ReactNode;
}

const Button = ({
    variant = 'outline',
    rounded = 'normal',
    children,
    className = '',
    ...props
}: ButtonProps) => {

    const baseStyles = "transform transition-all duration-200 active:scale-95 active:duration-75 py-2 px-4 cursor-pointer flex items-center justify-center gap-2 font-medium outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2";

    const variants = {
        fill: "bg-black text-white border-2 border-black hover:bg-zinc-800 hover:border-zinc-800 active:bg-zinc-900",
        outline: "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white active:bg-zinc-900"
    };

    const roundedStyles = {
        normal: "rounded-xl",
        full: "rounded-full"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${roundedStyles[rounded]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;