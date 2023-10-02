import styled from 'styled-components';
import { Spinner } from '../../common/components/loader';
import { ErrorLabel } from '../../common/components/error-label';

export const Loader = styled(Spinner)`
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;
export const ErrorText = styled(ErrorLabel)`
  margin-top: 40px;
`;
