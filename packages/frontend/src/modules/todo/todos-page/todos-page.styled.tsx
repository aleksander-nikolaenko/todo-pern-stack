import styled from 'styled-components';
import { SPACES } from '../../theme';

export const Header = styled('header')`
  width: 100%;
  padding: ${SPACES.m} ${SPACES.l};
`;

export const FilterBarWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${SPACES.m};
  margin-bottom: ${SPACES.l};
`;

export const FilterBarButtonList = styled('ul')``;
export const FilterBarItem = styled('li')`
  display: inline;
`;
