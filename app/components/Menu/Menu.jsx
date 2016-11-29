import styles from './_Menu.scss';
import React from 'react';
import MenuItem from './MenuItem';


let { Component } = React;


export default class Menu extends Component {

    static defaultProps = {
        items: []
    };


    render() {
        return (
            <div className="row">
                {this.props.items.map((item) => {
                    return (<MenuItem item={item} />);
                }, this)}
            </div>
        );
    }
}
