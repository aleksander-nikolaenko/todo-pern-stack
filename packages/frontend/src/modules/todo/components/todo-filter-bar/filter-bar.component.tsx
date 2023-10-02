import React, { useState } from 'react';
import { InputComponent } from '../../../common/components/input';
import { ButtonComponent } from '../../../common/components/button';

import * as Styled from './filter-bar.styled';

const FILTER_BAR = ['All', 'Private', 'Public', 'Completed'];

export const FilterBarComponent = () => {
  const [changedFilter, setChangedFilter] = useState(FILTER_BAR[0]);
  const handleClickButton = (item: string) => () => {
    setChangedFilter(item);
  };
  return (
    <Styled.FilterBarWrapper>
      <InputComponent name="search" buttonSearch placeholder="Search" />
      <Styled.FilterBarButtonList>
        {FILTER_BAR.map((item, index) => (
          <Styled.FilterBarItem key={index}>
            <ButtonComponent
              className={changedFilter === item ? 'active' : ''}
              onClick={handleClickButton(item)}
            >
              {item}
            </ButtonComponent>
          </Styled.FilterBarItem>
        ))}
      </Styled.FilterBarButtonList>
    </Styled.FilterBarWrapper>
  );
};
