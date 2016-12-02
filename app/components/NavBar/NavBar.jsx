
import React from 'react';

let { Component } = React;


const search = 'Email, Nom, Prénom...';

function formatage(str) {
    return str.toLowerCase();
}

export default class NavBar extends Component {


    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input placeholder={formatage(search)} id="search" type="search" required />
                            <label htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }
}
