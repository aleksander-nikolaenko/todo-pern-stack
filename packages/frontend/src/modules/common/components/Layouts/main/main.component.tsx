import React from 'react';
import * as Styled from './main.styled';

export const MainLayoutComponent = ({ children }: React.PropsWithChildren<{}>) => (
  <Styled.Main>{children}</Styled.Main>
);
