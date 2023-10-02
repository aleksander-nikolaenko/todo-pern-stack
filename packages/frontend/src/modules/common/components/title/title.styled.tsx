import styled from 'styled-components';
import { FONTS } from '../../../theme';

interface TitleProps {
  $size: 's' | 'm' | 'l' | 'xl';
}

export const Title = styled('h2')<TitleProps>`
  font-size: ${(props) => {
    switch (props.$size) {
      case 's':
        return FONTS.SIZES.m;
      case 'm':
        return FONTS.SIZES.l;
      case 'l':
        return FONTS.SIZES.xl;
      case 'xl':
        return FONTS.SIZES.xxl;
      default:
        return FONTS.SIZES.m;
    }
  }};
  font-weight: ${FONTS.WEIGHTS.bold};
`;
