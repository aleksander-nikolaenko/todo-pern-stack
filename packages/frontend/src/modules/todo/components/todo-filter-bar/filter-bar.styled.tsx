import styled from 'styled-components';
import { BREAKPOINTS, SPACES } from '../../../theme';

export const FilterBarWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${SPACES.m};
  margin-bottom: ${SPACES.l};

  @media (min-width: ${BREAKPOINTS.mobile}px) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const FilterBarButtonList = styled('ul')``;
export const FilterBarItem = styled('li')`
  display: inline;
`;
