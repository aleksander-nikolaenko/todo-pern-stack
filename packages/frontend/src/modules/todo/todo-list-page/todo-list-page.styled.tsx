import styled from 'styled-components';
import { Spinner } from '../../common/components/loader';
import { ErrorLabel } from '../../common/components/error-label';
import { Button } from '../../common/components/button';
import { COLORS, SPACES } from '../../theme';

export const ButtonAdd = styled(Button)`
  margin-bottom: ${SPACES.l};
`;
export const ButtonLoadMore = styled(Button)`
  width: 100%;
  margin-top: ${SPACES.l};
  margin-bottom: ${SPACES.l};
`;
export const Loader = styled(Spinner)`
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;
export const ErrorText = styled(ErrorLabel)`
  margin-top: 40px;
`;
export const Pagination = styled.div`
  margin-top: ${SPACES.l};

  & .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    & li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: 250ms;
      &:hover {
        color: ${COLORS.green};
        &.active {
          color: ${COLORS.white};
        }
      }
      &.disabled {
        color: ${COLORS.secondary};
      }
    }
    & a {
      padding: 2px 4px;
      cursor: pointer;
    }
  }

  .active {
    & a {
      cursor: default;
    }
    background-color: ${COLORS.gray};
    color: ${COLORS.white};
  }
`;
