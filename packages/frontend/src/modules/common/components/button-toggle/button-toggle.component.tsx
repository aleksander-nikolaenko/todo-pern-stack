import React from 'react';
import * as Styled from './button-toggle.styled';

interface ButtonToggleProps {
  name?: string;
  value?: boolean | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ButtonToggleComponent = ({ name, value, onChange }: ButtonToggleProps) => (
  <Styled.ToggleSwitchContainer htmlFor={name}>
    <Styled.CheckboxInput id={name} name={name} checked={value} onChange={onChange} />
    <Styled.Slider isActive={value} />
  </Styled.ToggleSwitchContainer>
);
