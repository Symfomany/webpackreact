
import styles from './_Footer.scss';
import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        &copy; Symfomany 2016
      </footer>
    );
  }
}
