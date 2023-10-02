import React from 'react';
import * as Styled from './header.styled';

export const HeaderLayoutComponent = ({ children }: React.PropsWithChildren<{}>) => (
  <Styled.Header>{children}</Styled.Header>
);
