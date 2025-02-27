import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full px-4 py-2 bg-white text-black font-extrabold rounded-full ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
