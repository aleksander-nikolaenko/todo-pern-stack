import styled from 'styled-components';
import { BREAKPOINTS } from '../../../../theme';

export const Nav = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (min-width: ${BREAKPOINTS.mobile}px) {
    justify-content: flex-end;
  }
`;
