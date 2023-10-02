import styled from 'styled-components';
import { COLORS, SPACES } from '../../../theme';
import { SHADOWS } from '../../../theme/shadow.const';

export const Table = styled('table')`
  width: 100%;
  /* table-layout: auto; */
  border-collapse: collapse;
  border: 2px solid ${COLORS.black};
  box-shadow: ${SHADOWS.secondary};
`;
export const HeaderCol = styled('th')`
  text-align: left;
  padding: ${SPACES.xs} ${SPACES.s};
  background-color: ${COLORS.gray};
  color: ${COLORS.black};
  border: 2px solid ${COLORS.black};
  &:nth-child(1) {
    width: 20%;
  }
  &:nth-child(2) {
    width: 50%;
  }
  &:nth-child(3) {
    width: 30%;
  }
`;
export const BodyRow = styled('tr')`
  text-align: left;
  background-color: ${COLORS.secondary};
  color: ${COLORS.black};
  &:nth-child(2n) {
    background-color: ${COLORS.white};
  }
`;
export const BodyCol = styled('td')`
  padding: ${SPACES.xs} ${SPACES.s};
  border-left: 2px solid ${COLORS.black};
  border-right: 2px solid ${COLORS.black};
`;
export const ButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
