import React from 'react';

let { Component, PropTypes } = React;

export default class MenuItem extends Component {

  render() {
    return (
      <div className="col s3 m3">
        <div className="card blue-grey darken-1">
          <div key={'menu-item-' + this.props.item.id.name}>
            <h5>{this.props.item.name.title} {this.props.item.name.first} {this.props.item.name.last}</h5>
            <p>Email: <a>{this.props.item.email}</a></p>
            <p>Telephone: <a>{this.props.item.email}</a></p>
            <img src={this.props.item.picture.thumbnail} className="img-responsive" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
