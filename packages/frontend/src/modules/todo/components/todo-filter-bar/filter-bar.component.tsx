import React, { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { InputComponent } from '../../../common/components/input';
import { ButtonComponent } from '../../../common/components/button';
import { FilterOptions } from '../../../common/enums';

import * as Styled from './filter-bar.styled';

interface FilterBarProps {
  onChangeQueryParams: (params: { [key: string]: string }) => void;
  getQueryParams: () => { [key: string]: string };
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const FILTER_BAR: string[] = Object.values(FilterOptions);

export const FilterBarComponent = ({
  onChangeQueryParams,
  getQueryParams,
  setPage
}: FilterBarProps) => {
  const params = getQueryParams();
  const [changedFilter, setChangedFilter] = useState(params.status || FILTER_BAR[0]);
  const [search, setSearch] = useState(params.search || '');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onChangeQueryParams({ status: changedFilter, search: debouncedSearch });
  }, [debouncedSearch, changedFilter]);

  const handleClickButton = (item: string) => () => {
    onChangeQueryParams({ status: item });
    setChangedFilter(item);
    setPage('1');
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
