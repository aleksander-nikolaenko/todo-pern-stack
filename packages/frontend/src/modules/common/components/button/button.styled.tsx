import styled from 'styled-components';
import { COLORS, SPACES } from '../../../theme';

export const Button = styled.button`
  cursor: pointer;
  border: 2px solid ${COLORS.black};
  background-color: ${COLORS.white};
  box-shadow: ${SPACES.xs} ${SPACES.xs} 0px 0px ${COLORS.black};
  transition: transform box-shadow 250ms;
  &.active {
    background-color: ${COLORS.green};
  }
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    box-shadow: 2px 2px 0px 0px ${COLORS.black};
  }
  &:disabled {
    pointer-events: none;
  }
`;
