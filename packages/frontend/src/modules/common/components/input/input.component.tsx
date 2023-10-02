import React from 'react';
import Search from '../../../../assets/image/search.svg';

import * as Styled from './input.styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  buttonSearch?: boolean;
  label?: string;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
}

export const InputComponent = ({
  name,
  buttonSearch,
  label,
  onClickButton,
  ...rest
}: InputProps) => (
  <Styled.InputWrapper>
    {label && <Styled.Label htmlFor={name}>{label}</Styled.Label>}
    <Styled.Input $button={buttonSearch} id={name} name={name} {...rest} />
    {buttonSearch && (
      <Styled.Button type="button" onClick={onClickButton}>
        <img src={Search} alt="search" />
      </Styled.Button>
    )}
  </Styled.InputWrapper>
);
