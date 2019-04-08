import React, { Component } from 'react'

class TOWasteGameDescription extends Component {

    render() {
        return (
            <div className="container border rounded p-4">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="logo-font">The Game</h3>
                        <ol>
                            <li>Select in which garbage each of the objects should go.</li>
                            <li>UNDER CONSTRUCTION!</li>
                        </ol>
                    </div>
                    <div className="col-md-6">
                        <h3 className="logo-font"><i class="fas fa-recycle"></i> How to Recycle</h3>
                        Try to follow these premises:
                        <ul className="list-unstyled">
                            <li><i class="fas fa-dumpster"></i> Blue bin: UNDER CONSTRUCTION!</li>
                            <li><i class="fas fa-dumpster"></i> Green bin: UNDER CONSTRUCTION!</li>
                            <li><i class="fas fa-dumpster"></i> Garbage: UNDER CONSTRUCTION!</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
} export default TOWasteGameDescription