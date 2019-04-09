import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg border-bottom navbarcustom py-3">
                <div className="navbar-brand logo-font">
                    <h1><i class="fas fa-city"></i> TOWaste Game</h1>
                    <h6>by Daniel Rodrigues</h6>
                </div>
            </nav>
        );
    }
}
export default Navbar;