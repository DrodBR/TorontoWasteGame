import React, { Component } from 'react'

class TOWasteGameDescription extends Component {

    render() {
        return (
            <div className="container border-dotted rounded p-3">
                <div className="row">
                    <div className="col-md-6 border-right pb-2">
                        <h3 className="logo-font"><i class="fas fa-dice-d6"></i> The Game</h3>
                        Show that you know everything when the subject is dispose materials.
                        You have 10 items that need to be disposed. Where will be the best place for them?
                        <br /> <br />Test your knowledge and learn more!
                    </div>
                    <div className="col-md-6">
                        <h3 className="logo-font"><i class="fas fa-recycle"></i> Instructions</h3>
                        <div className="pb-2">Try to follow these premises to get the best score:</div>
                        <ul className="list-unstyled">
                            <li>
                                <div className="pb-1">
                                    <i class="fas fa-dumpster icon-bluebin"></i> Blue Bin: Recyclable
                                </div>
                            </li>
                            <li>
                                <div className="pb-1">
                                    <i class="fas fa-dumpster icon-greenbin"></i> Green Bin: Organic
                                </div>
                            </li>
                            <li>
                                <div className="pb-1">
                                    <i class="fas fa-dumpster icon-garbage"></i> Garbage: Others
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
} export default TOWasteGameDescription