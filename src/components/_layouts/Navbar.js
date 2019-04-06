import React, { Component } from 'react'
 
class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg border-bottom navbarcustom">
                <div class="navbar-brand logo-font"><h1><i class="fas fa-city"></i> Toronto Waste Game</h1></div>
                <span>by Daniel Rodrigues <i class="fas fa-react"></i></span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
        );
    }
}
export default Navbar;