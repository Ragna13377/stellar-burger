import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../services/profile/actions';
import { useDispatch, useSelector } from '../../services/store';
import { getUserError } from '../../services/profile/slice';
import { useLocation } from 'react-router-dom';
import { isUnAuthLocation } from '../../utils/utils';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector(getUserError);
  const location = useLocation();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, name: userName, password }));
  };
  return (
    <RegisterUI
      errorText={isUnAuthLocation(location) ? undefined : errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
