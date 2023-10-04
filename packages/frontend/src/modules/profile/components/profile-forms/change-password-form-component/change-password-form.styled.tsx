import styled from 'styled-components';
import { BREAKPOINTS, SPACES } from '../../../../theme';
import { Title } from '../../../../common/components/title';
import { ErrorLabel } from '../../../../common/components/error-label';
import { Spinner } from '../../../../common/components/loader';

export const FormWrapper = styled('div')`
  padding: ${SPACES.l} ${SPACES.l};
  min-width: 80vw;
  overflow: scroll;
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    min-width: 620px;
  }
`;

export const FormTitle = styled(Title)`
  text-align: center;
  margin-bottom: ${SPACES.m};
`;
export const Form = styled('form')``;
export const FormField = styled('div')`
  position: relative;
  margin-bottom: ${SPACES.s};
`;

export const ErrorText = styled(ErrorLabel)`
  display: block;
  position: absolute;
  top: 14px;
`;
export const Label = styled('label')`
  display: block;
  margin-bottom: ${SPACES.s};
`;
export const ButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: ${SPACES.l};
`;

export const Loader = styled(Spinner)`
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;
