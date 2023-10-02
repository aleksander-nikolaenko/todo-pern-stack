import styled from 'styled-components';
import { Spinner } from '../../common/components/loader';
import { ErrorLabel } from '../../common/components/error-label';
import { Button } from '../../common/components/button';
import { SPACES } from '../../theme';

export const ButtonAdd = styled(Button)`
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
