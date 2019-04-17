import React, { Component } from 'react'
import Footer1 from '../_pages/TOWasteGame/Footer1'
import Footer2 from '../_pages/TOWasteGame/Footer2'

class Footer extends Component {

    render() {
        return (
            <div className="pt-3">
                <div className="footercustom">
                    <div className="container">
                        <div className="row py-3">
                            <Footer1 />
                            <Footer2 />
                        </div>
                        <div className="row">
                            <div className="p-3 centralize">
                                <i class="fas fa-exclamation-circle"></i> This game has no direct
                                relationship with the City of Toronto.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default Footer