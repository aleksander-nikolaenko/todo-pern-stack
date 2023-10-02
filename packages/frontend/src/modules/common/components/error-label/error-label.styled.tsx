import styled from 'styled-components';
import { COLORS, FONTS } from '../../../theme';

interface ErrorLabelProps {
  $size: 's' | 'm' | 'l';
}

export const ErrorLabel = styled('p')<ErrorLabelProps>`
  font-size: ${(props) => {
    switch (props.$size) {
      case 's':
        return FONTS.SIZES.s;
      case 'm':
        return FONTS.SIZES.m;
      case 'l':
        return FONTS.SIZES.l;
      default:
        return FONTS.SIZES.m;
    }
  }};
  font-weight: ${FONTS.WEIGHTS.normal};
  color: ${COLORS.red};
`;
