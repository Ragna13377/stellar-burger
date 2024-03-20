import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/profile/actions';
import { getUserError } from '../../services/profile/slice';
import { isUnAuthLocation } from '../../utils/utils';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const errorText = useSelector(getUserError);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  return (
    <LoginUI
      errorText={isUnAuthLocation(location) ? undefined : errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      location={location.state?.from || '/'}
    />
  );
};
