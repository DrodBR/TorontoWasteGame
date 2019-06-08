import React from 'react'

const ProgressBar = (props) => {
    return (
        <div>
            <div className="py-3">
                <div class="progress">
                    <div class={`progress-bar progress-bar-striped2 bg-progress w-${props.size}`}
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProgressBar