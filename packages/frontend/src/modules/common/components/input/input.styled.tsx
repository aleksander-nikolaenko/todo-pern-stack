import styled from 'styled-components';
import { COLORS, SPACES } from '../../../theme';

interface InputProps {
  $button: boolean | undefined;
}

export const InputWrapper = styled('div')`
  position: relative;
`;

export const Label = styled('label')`
  display: block;
  margin-bottom: ${SPACES.xs};
`;

export const Input = styled('input')<InputProps>`
  width: ${(props) => (props.$button ? '180px' : '100%')};
  padding: ${SPACES.xs} ${SPACES.s};
  padding-left: ${(props) => (props.$button ? '2.5rem' : SPACES.s)};
  border: 2px solid ${COLORS.black};
  outline: none;
  background-color: ${COLORS.white};
  box-shadow: 5px 5px 3px 0px ${COLORS.black};
`;

export const Button = styled('button')`
  display: block;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
