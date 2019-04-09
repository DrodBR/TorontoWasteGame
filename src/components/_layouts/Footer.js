import React, { Component } from 'react'
import TOWasteGameFooter1 from '../_pages/TOWasteGame/TOWasteGameFooter1'
import TOWasteGameFooter2 from '../_pages/TOWasteGame/TOWasteGameFooter2'

class Footer extends Component {

    render() {
        return (
            <div className="pt-3">
                <div className="footercustom">
                    <div className="container">
                        <div className="row py-3">
                            <TOWasteGameFooter1 />
                            <TOWasteGameFooter2 />
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