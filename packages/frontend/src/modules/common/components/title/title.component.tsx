import React from 'react';
import * as Styled from './title.styled';

interface TitleProps {
  size: 's' | 'm' | 'l' | 'xl';
  title: string;
}

export const TitleComponent = ({ size = 'm', title }: TitleProps) => (
  <Styled.Title $size={size}>{title}</Styled.Title>
);
