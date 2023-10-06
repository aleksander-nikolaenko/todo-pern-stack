import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDevice, useGetTodos } from '../../../hooks';
import { MainLayoutComponent } from '../../common/components/Layouts';
import { FilterBarComponent } from '../components/todo-filter-bar';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { TodoSliderComponent } from '../components/todo-slider';
import { TodoTableComponent } from '../components/todo-table';
import { AddTodoForm } from '../components/todo-forms/add-form';
import { Modal } from '../../common/components/modal';
import { BREAKPOINTS } from '../../theme';
import { useSearchParams } from '../../../hooks/use-search-params.hook';

import * as Styled from './todo-list-page.styled';
import { useInfiniteTodos } from '../../../hooks/todo/use-infinite-todos';
import { DeviceLimitPagination } from '../../common/enums';

export const TodoListPageComponent = () => {
  const { setSearchParams, getSearchParams } = useSearchParams();
  const params = getSearchParams();
  const { status, search, page, limit } = params;

  const {
    unwrapData: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useInfiniteTodos({
    status,
    search,
    page,
    limit
  });

  const { isError, isSuccess, isLoading, data, error } = useGetTodos({
    status,
    search,
    page,
    limit
  });
  const dataSuccess = isSuccess && !!data.todos;
  const { isDesktop, isTablet, isMobile } = useDevice({
    mobile: BREAKPOINTS.mobile,
    tablet: BREAKPOINTS.tablet,
    desktop: BREAKPOINTS.desktop
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(page || '1');

  const getDeviceLimit = () => {
    if (isMobile) return DeviceLimitPagination.Mobile;
    if (isTablet) return DeviceLimitPagination.Tablet;
    return DeviceLimitPagination.Desktop;
  };
  useEffect(() => {
    const paginationLimit = getDeviceLimit();
    setSearchParams({ page: '1', limit: paginationLimit });
    setCurrentPage('1');
  }, [isDesktop, isTablet, isMobile]);

  useEffect(() => {
    const paginationLimit = getDeviceLimit();
    setSearchParams({ page: currentPage, limit: limit || paginationLimit });
  }, [currentPage, limit]);

  const handleClickAddTodo = () => {
    setIsModalOpen(true);
  };
  const handleClickLoadMore = () => {
    setCurrentPage((prev) => `${+prev + 1}`);
    fetchNextPage();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => `${+prev + 1}`);
      fetchNextPage();
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(`${selected + 1}`);
  };

  return (
    <MainLayoutComponent>
      <FilterBarComponent
        setPage={setCurrentPage}
        getQueryParams={getSearchParams}
        onChangeQueryParams={setSearchParams}
      />
      <Styled.ButtonAdd type="button" onClick={handleClickAddTodo}>
        Add Todo
      </Styled.ButtonAdd>
      {isLoading && <Styled.Loader />}

      {isError && (
        <Styled.ErrorText $size="m">
          Error: {error instanceof Error ? error.message : error}
        </Styled.ErrorText>
      )}

      {dataSuccess && isMobile && <TodoListComponent data={infiniteData} />}
      {dataSuccess && isTablet && (
        <TodoSliderComponent onLoadMore={handleLoadMore} data={infiniteData} />
      )}
      {dataSuccess && isDesktop && <TodoTableComponent data={data?.todos} />}

      {!isLoading && isDesktop && dataSuccess && (
        <Styled.Pagination>
          <ReactPaginate
            forcePage={+currentPage - 1}
            pageCount={data?.pagination.totalPages || 1}
            nextLabel=">"
            previousLabel="<"
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            disabledClassName="disabled"
          />
        </Styled.Pagination>
      )}

      {isMobile && !isFetching && hasNextPage && (
        <Styled.ButtonLoadMore type="button" onClick={handleClickLoadMore}>
          Load More
        </Styled.ButtonLoadMore>
      )}

      {isFetching && <Styled.Loader />}

      <Modal isOpen={isModalOpen} onClose={closeModal} isClose>
        <AddTodoForm onCancel={closeModal} />
      </Modal>
    </MainLayoutComponent>
  );
};
