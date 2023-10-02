import { useCurrentWidth } from './use-current-width.hook';

interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

export const useDevice = ({ mobile, tablet, desktop }: Breakpoints) => {
  const currentWidth = useCurrentWidth();

  const isDesktop = currentWidth > tablet && currentWidth <= desktop;

  const isTablet = currentWidth > mobile && currentWidth <= tablet;

  const isMobile = currentWidth <= mobile;

  return {
    isDesktop,
    isTablet,
    isMobile
  };
};
