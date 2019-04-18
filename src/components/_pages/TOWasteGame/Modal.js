import React from 'react'

const Modal =  (props) => {
        return (
            <div class="modal fade" id="ModalScore" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">{props.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body text-center">
                            {props.children}
                        </div>
                        <div className="border-top p-3 text-center">
                            It's always a good time to learn more. <br />
                            Try the <span className="font-weight-bold">
                                <a href="https://www.toronto.ca/services-payments/recycling-organics-garbage/waste-wizard/"
                                target="_blank" rel="noopener noreferrer">Waste Wizard <i class="fas fa-external-link-alt"></i> </a></span>
                            and get your questions answered.
                            </div>
                        <div class="modal-footer">
                            <button type="button" class={props.score === props.size ? "btn btn-danger d-none" : "btn btn-danger"} data-dismiss="modal" aria-label="Close">Check Errors</button>
                        </div>
                    </div>
                </div>
            </div>
        )

}
export default Modal