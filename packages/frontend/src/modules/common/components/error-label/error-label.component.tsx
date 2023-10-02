import React from 'react';
import * as Styled from './error-label.styled';

type ErrorLabelProps = React.PropsWithChildren<{
  size?: 's' | 'm' | 'l';
}>;

export const ErrorLabelComponent = ({ size = 'm', children }: ErrorLabelProps) => (
  <Styled.ErrorLabel $size={size}>{children}</Styled.ErrorLabel>
);
