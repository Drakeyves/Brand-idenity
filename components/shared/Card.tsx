import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover';
  className?: string;
}

const Card = ({ 
  children, 
  variant = 'default',
  className 
}: CardProps) => {
  return (
    <div className={cn(
      variant === 'default' ? 'card-drake' : 'card-drake-hover',
      'w-full',
      className
    )}>
      {children}
    </div>
  );
};

interface CardComponentProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: CardComponentProps) => {
  return (
    <h2 className={cn(
      "card-title text-xl font-medium leading-none tracking-tight text-white",
      className
    )}>
      {children}
    </h2>
  );
};

const Description = ({ children, className }: CardComponentProps) => {
  return (
    <div className={cn(
      "text-accent-metallic-light text-sm",
      className
    )}>
      {children}
    </div>
  );
};

const Header = ({ children, className }: CardComponentProps) => {
  return <div className={cn("flex gap-2 flex-col", className)}>{children}</div>;
};

const Body = ({ children, className }: CardComponentProps) => {
  return <div className={cn("card-body gap-4 p-6", className)}>{children}</div>;
};

const Footer = ({ children, className }: CardComponentProps) => {
  return (
    <div className={cn(
      "card-actions justify-end p-4 border-t border-accent-metallic-dark/10 bg-background-secondary/50",
      className
    )}>
      {children}
    </div>
  );
};

Card.Body = Body;
Card.Title = Title;
Card.Description = Description;
Card.Header = Header;
Card.Footer = Footer;

export default Card;
