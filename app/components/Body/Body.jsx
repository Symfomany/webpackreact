import styles from './_Body.scss';
import React from 'react';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';

let { PropTypes } = React;


export default class Body extends React.Component {

  static defaultProps = {
    items: []
  };

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className={styles.body}>
        <NavBar />
        <h1 className={styles.header}>React Seeder </h1>
        <Menu items={this.props.items} />
      </div>
    );
  }
}
