import styled from 'styled-components';
import { COLORS } from '../../../theme';
import { SHADOWS } from '../../../theme/shadow.const';

export const ToggleSwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
`;

export const Slider = styled.span<{ isActive: boolean | undefined }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.isActive ? COLORS.green : COLORS.secondary)};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border: 2px solid ${COLORS.black};
  box-shadow: ${SHADOWS.secondary};
  border-radius: 24px;
  &:hover {
    ::before {
      box-shadow: 0px 0px 5px 0px ${COLORS.black};
    }
  }

  &:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: ${COLORS.white};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 2px solid ${COLORS.black};
    border-radius: 50%;
    transform: ${(props) => (props.isActive ? 'translateX(18px)' : 'translateX(0)')};
  }
`;

export const CheckboxInput = styled.input`
  display: none;

  &:checked + ${Slider} {
    background-color: ${COLORS.green};
  }
`;
