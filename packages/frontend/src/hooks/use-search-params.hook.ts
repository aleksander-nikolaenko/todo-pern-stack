import { useLocation, useHistory } from 'react-router-dom';

export function useSearchParams() {
  const location = useLocation();
  const history = useHistory();

  const setSearchParams = (params: { [key: string]: string }) => {
    const searchParams = new URLSearchParams(location.search);

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams.set(key, params[key]);
      }
    }

    const newSearchString = searchParams.toString();

    history.push({
      pathname: location.pathname,
      search: newSearchString
    });
  };

  function getSearchParams() {
    const searchParams = new URLSearchParams(location.search);
    const params: { [key: string]: string } = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  return {
    setSearchParams,
    getSearchParams
  };
}
