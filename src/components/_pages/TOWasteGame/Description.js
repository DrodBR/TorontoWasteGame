import React from 'react'

const Description = () => {
        return (
            <div className="container border rounded p-3">
                <div className="row">
                    <div className="col-md-6 border-right pb-2">
                        <h3 className="logo-font"><i class="fas fa-dice-d6"></i> The Game</h3>
                        Test your knowledge on how to properly throw your trash out in the city of Toronto.
                        Indicate where each of the 10 items below should be discarded and see how much you know!
                        <br /> <br />Play as many times as you want to learn more!
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
export default Description