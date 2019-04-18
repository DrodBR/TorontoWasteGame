import React from 'react'

const Footer1 = () => {
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
export default Footer1