import React from 'react';
import styles from '../../components/app/app.module.css';
import { AppHeader } from '@components';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);
