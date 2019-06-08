import React from 'react'

const FullLayout = (props) => {
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div className="main" class="m-2 p-2 col-md-12 col-sm-12 rounded-bottom bg-light text-secondary shadow-sm">
                        {props.main}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullLayout