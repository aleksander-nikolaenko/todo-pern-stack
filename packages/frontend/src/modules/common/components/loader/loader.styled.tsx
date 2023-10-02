import styled, { keyframes } from 'styled-components';
import { COLORS, SPACES } from '../../../theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: ${SPACES.xs} solid transparent;
  border-top: ${SPACES.xs} solid ${COLORS.green};
  border-left: ${SPACES.xs} solid ${COLORS.green};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;
