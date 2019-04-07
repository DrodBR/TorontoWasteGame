import React, { Component } from 'react'

class Footer extends Component {

    render() {
        return (
            <div className="pt-3">
                <div className="footercustom">
                    <div class="container">
                        <div class="row py-3">
                            <div className="col-md-6 text-center p-3 border-right border-left">
                                <h4 className="logo-font">{this.props.title1}</h4>
                                <span>Teste</span>
                            </div>
                            <div className="col-md-6 text-center p-3 border-right border-left">
                                <h4 className="logo-font">{this.props.title2}</h4>
                                <span>Teste</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default Footer