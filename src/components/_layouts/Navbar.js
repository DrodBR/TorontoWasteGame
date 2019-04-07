import React, { Component } from 'react'
 
class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg border-bottom navbarcustom py-3">
                <div class="navbar-brand logo-font"><h1><i class="fas fa-city"></i> TOWaste Game<h6>by Daniel Rodrigues</h6></h1></div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
        );
    }
}
export default Navbar;