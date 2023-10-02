import React from 'react';
import * as Styled from './nav.styled';

type NavProps = React.PropsWithChildren<{}>;

export const NavLayoutComponent = ({ children }: NavProps) => <Styled.Nav>{children}</Styled.Nav>;
