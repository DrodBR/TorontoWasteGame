import React, { Component } from 'react'

class ProgressBar extends Component {
    render() {
        return (
            <div>
                <div className="py-3">
                    <div class="progress">
                        <div class={`progress-bar progress-bar-striped2 bg-progress w-${this.props.size}`}
                            role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default ProgressBar