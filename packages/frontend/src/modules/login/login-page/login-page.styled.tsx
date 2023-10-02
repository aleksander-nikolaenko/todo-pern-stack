import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FONTS } from '../../theme';

export const PageContainer = styled('div')`
  text-align: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Link = styled(NavLink)`
  font-size: ${FONTS.SIZES.m};
`;
