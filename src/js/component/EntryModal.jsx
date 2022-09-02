import React from "react"

export const EntryModal = ()=>{
    return (
        <div>
            <div className="modal fade" id="modalToggle" aria-hidden="true" aria-labelledby="modalToggleLabel" tabIndex="0">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="row p-3 pb-4">
                            You can't set an empty ToDo!<br></br>That would break the space time (and this poor code too)
                        </div>
                        <div className="footer d-flex justify-content-center pb-3">
                            <button type="button" className="btn btn-secondary ms-1" data-bs-dismiss="modal">Let's go!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}