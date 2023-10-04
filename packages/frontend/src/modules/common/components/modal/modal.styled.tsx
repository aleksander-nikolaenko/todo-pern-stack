import styled, { keyframes } from 'styled-components';
import { COLORS, SPACES } from '../../../theme';

const FadeIn = keyframes`
  0% { transform: scale(-50%, -50%) scale(0); }
  100% { transform: translate(-50%, -50%) scale(1); }
`;
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  max-height: 80vh;
  padding: ${SPACES.m} ${SPACES.m};
  transform: translate(-50%, -50%);
  background-color: ${COLORS.white};
  border-radius: 5px;
  overflow-y: scroll;
  animation: ${FadeIn} 250ms;
`;
export const CloseButton = styled.button`
  position: absolute;
  top: ${SPACES.s};
  right: ${SPACES.s};
  width: 24px;
  height: 24px;
  border: 1px solid ${COLORS.gray};
  border-radius: 50%;
  color: ${COLORS.black};
  background-color: transparent;
  cursor: pointer;
  transition: all 250ms;
  &:hover {
    border-color: ${COLORS.black};
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 2px;
    height: 16px;
    background-color: ${COLORS.black};
    top: 15%;
    left: 45%;
    transform-origin: center;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
