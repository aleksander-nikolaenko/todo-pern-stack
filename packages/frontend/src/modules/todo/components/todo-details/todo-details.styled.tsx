import styled from 'styled-components';
import { BREAKPOINTS, FONTS, SPACES } from '../../../theme';
import { Title } from '../../../common/components/title';

export const SubTitle = styled('h3')`
  font-size: ${FONTS.SIZES.l};
  font-weight: ${FONTS.WEIGHTS.normal};
  margin-bottom: ${SPACES.m};
`;

export const SubTitleDescription = styled(SubTitle)`
  margin-top: 80px;
`;

export const Description = styled('p')`
  margin-bottom: ${SPACES.xl};
`;

export const ButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonWrapperPrivate = styled(ButtonWrapper)`
  margin-bottom: 40px;
`;
export const ButtonWrapperEdit = styled(ButtonWrapper)`
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: ${SPACES.m};
`;
export const ButtonWrapperModal = styled(ButtonWrapper)`
  justify-content: space-around;
`;

export const ModalWrapper = styled('div')`
  padding: ${SPACES.l} ${SPACES.l};
  min-width: 80vw;
  overflow: scroll;
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    min-width: 620px;
  }
`;

export const ModalTitle = styled(Title)`
  text-align: center;
  margin-bottom: ${SPACES.m};
`;
