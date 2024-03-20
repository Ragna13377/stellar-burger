import React, { ReactNode, useEffect } from 'react';
import { getUser, getUserLoadingState } from '../services/profile/slice';
import { useDispatch, useSelector } from '../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};
export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isRequestOver } = useSelector(getUserLoadingState);
  const user = useSelector(getUser);
  if (!isRequestOver) return <Preloader />;
  if (!onlyUnAuth && !user)
    return <Navigate replace to='/login' state={{ from: location }} />;
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
