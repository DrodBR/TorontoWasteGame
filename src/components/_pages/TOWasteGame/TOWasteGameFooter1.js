import React, { Component } from 'react'

class TOWasteGameFooter1 extends Component {

    render() {
        return (
            <div className="col-md-6 text-center p-3 border-right border-left">
                <h3 className="logo-font">Author</h3>
                <div className="text-center float-center">
                    <img src={process.env.PUBLIC_URL + '/assets/images/me.jpg'} alt="me"
                        className="border rounded-circle w-25 bg-dark p-1" />
                    <br />
                    <strong>Daniel Fernando<br />Guimarães Rodrigues</strong>
                </div>
            </div>
        )
    }
} export default TOWasteGameFooter1