import styled from 'styled-components';
import { BREAKPOINTS, COLORS, SPACES } from '../../../theme';
import { SHADOWS } from '../../../theme/shadow.const';
import { Title } from '../../../common/components/title';

export const SlideWrapper = styled('div')`
  padding: ${SPACES.l} ${SPACES.s};
  border: 2px solid ${COLORS.black};
  box-shadow: ${SHADOWS.secondary};
`;
export const Description = styled('p')`
  margin-top: ${SPACES.l};
  margin-bottom: ${SPACES.l};
`;

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
