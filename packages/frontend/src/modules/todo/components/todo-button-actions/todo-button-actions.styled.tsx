import styled from 'styled-components';
import { Title } from '../../../common/components/title';
import { BREAKPOINTS, SPACES } from '../../../theme';

export const ModalWrapper = styled('div')`
  padding: ${SPACES.l} ${SPACES.l};
  min-width: 80vw;
  overflow: scroll;
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    min-width: 620px;
  }
`;

export const ButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ModalTitle = styled(Title)`
  text-align: center;
  margin-bottom: ${SPACES.m};
`;
