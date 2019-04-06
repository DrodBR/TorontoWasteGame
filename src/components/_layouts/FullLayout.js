import React, { Component } from 'react'
 
class FullLayout extends Component {
 
    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div className="main" class="m-2 p-2 col-md-12 col-sm-12 rounded-bottom bg-light text-secondary shadow-sm">
                            {this.props.main}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FullLayout