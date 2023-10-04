import styled from 'styled-components';
import { SPACES } from '../../theme';

export const PageContainer = styled('div')`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: ${SPACES.xl};
`;
