import React from 'react';
import styles from './error.module.css';

const Error = () => (
  <>
    <div className={styles.error}>
      Что-то пошло не так :(
      <a onClick={() => location.reload()} className={styles.recommendation}>
        Попробуйте обновить страницу
      </a>
    </div>
  </>
);

export default Error;
