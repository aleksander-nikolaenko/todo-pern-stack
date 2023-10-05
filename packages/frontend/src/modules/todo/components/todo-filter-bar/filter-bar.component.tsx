import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { InputComponent } from '../../../common/components/input';
import { ButtonComponent } from '../../../common/components/button';
import { FilterOptions } from '../../../common/enums';
import { APP_KEYS } from '../../../common/consts';

import * as Styled from './filter-bar.styled';

interface FilterBarProps {
  onChangeQueryParams: (params: { [key: string]: string }) => void;
  getQueryParams: () => { [key: string]: string };
}

const FILTER_BAR: string[] = Object.values(FilterOptions);

export const FilterBarComponent = ({ onChangeQueryParams, getQueryParams }: FilterBarProps) => {
  const queryClient = useQueryClient();
  const params = getQueryParams();
  const [changedFilter, setChangedFilter] = useState(params.status || FILTER_BAR[0]);
  const [search, setSearch] = useState(params.search || '');

  useEffect(() => {
    onChangeQueryParams({ status: changedFilter, search });
  }, []);

  const handleClickButton = (item: string) => () => {
    onChangeQueryParams({ status: item });
    setChangedFilter(item);
    queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQueryParams({ search: event.target.value });
    setSearch(event.target.value);
  };

  return (
    <Styled.FilterBarWrapper>
      <InputComponent
        onChange={handleChangeInput}
        value={search}
        name="search"
        buttonSearch
        placeholder="Search"
      />
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
