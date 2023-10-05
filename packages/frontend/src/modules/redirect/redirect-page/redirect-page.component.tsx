import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { TitleComponent } from '../../common/components/title/title.component';
import { APP_KEYS } from '../../common/consts';

import * as Styled from './redirect-page.styled';

export const RedirectPageComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  useEffect(() => {
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, token || '');
    setTimeout(() => {
      queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.USER);
      history.push(APP_KEYS.ROUTER_KEYS.ROOT);
    }, 1000);
  }, []);

  return (
    <Styled.PageContainer>
      <TitleComponent size="xl" title=" Welcome to Todo App" />
    </Styled.PageContainer>
  );
};
