import React from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderLayoutComponent, NavLayoutComponent } from '../../../common/components/Layouts';
import { ButtonComponent } from '../../../common/components/button';
import { APP_KEYS } from '../../../common/consts';
import { useDevice } from '../../../../hooks';
import { BREAKPOINTS } from '../../../theme';

export const TodoHeaderComponent = () => {
  const history = useHistory();
  const { isMobile } = useDevice({
    mobile: BREAKPOINTS.mobile,
    tablet: BREAKPOINTS.tablet,
    desktop: BREAKPOINTS.desktop
  });
  const handleClickTodo = () => {
    history.push(APP_KEYS.ROUTER_KEYS.TODO);
  };
  const handleClickProfile = () => {
    history.push(APP_KEYS.ROUTER_KEYS.PROFILE);
  };
  return (
    <HeaderLayoutComponent>
      <NavLayoutComponent>
        {isMobile && <ButtonComponent onClick={handleClickTodo}>Todo List</ButtonComponent>}
        <ButtonComponent onClick={handleClickProfile}>My Profile</ButtonComponent>
      </NavLayoutComponent>
    </HeaderLayoutComponent>
  );
};
