import React, { Component } from 'react'

class TOWasteGameModal extends Component {

    render() {
        return (
            <div class="modal fade" id="ModalScore" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">{this.props.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center">
                                {this.props.children}
                            </div>
                            <div class="modal-footer">
                            <button type="button" class={this.props.score === this.props.size ? "btn btn-danger d-none" : "btn btn-danger"} data-dismiss="modal" aria-label="Close">Check Errors</button>
                            <a class="btn btn-secondary" href="./">Play Again</a>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

} export default TOWasteGameModal