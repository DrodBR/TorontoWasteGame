import React, { Component } from 'react'
import TOWasteGameFooter1 from '../_pages/TOWasteGame/TOWasteGameFooter1'
import TOWasteGameFooter2 from '../_pages/TOWasteGame/TOWasteGameFooter2'

class Footer extends Component {

    render() {
        return (
            <div className="pt-3">
                <div className="footercustom">
                    <div class="container">
                        <div class="row py-3">
                            <TOWasteGameFooter1 />
                            <TOWasteGameFooter2 />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default Footer