import React from "react"

export const EntryModal = ()=>{
    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto">You can't set an empty ToDo!</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                That would break the space time (and this poor code too)...
            </div>
        </div>
    )
}