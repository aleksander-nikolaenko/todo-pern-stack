import React from 'react';
import * as Styled from './button-toggle.styled';

interface ButtonToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const ButtonToggleComponent = ({ type, id, ...rest }: ButtonToggleProps) => (
  <Styled.ToggleSwitchContainer htmlFor={rest.name}>
    <Styled.CheckboxInput id={rest.name} type="checkbox" {...rest} />
    <Styled.Slider isActive={rest.checked} />
  </Styled.ToggleSwitchContainer>
);
