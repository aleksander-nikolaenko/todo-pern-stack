import React from 'react';
import * as Styled from './button.styled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonComponent = ({ children, type = 'button', ...rest }: ButtonProps) => (
  <Styled.Button type={type} {...rest}>
    {children}
  </Styled.Button>
);
