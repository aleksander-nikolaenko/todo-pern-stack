import styled from 'styled-components';
import { SPACES, FONTS, COLORS } from '../../theme';

export const ButtonContainer = styled('div')`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${SPACES.l};
  margin-top: 40px;
`;

export const PageContainer = styled('div')`
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Link = styled('a')`
  font-size: ${FONTS.SIZES.m};
  text-decoration: underline;
  color: ${COLORS.green};
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: ${COLORS.red};
  }
`;
