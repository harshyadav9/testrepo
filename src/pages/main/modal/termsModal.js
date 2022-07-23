import React from "react";
import { useState, useEffect } from "react";

export default function TermsModal({ show, handleClose, modalBody, modalHeading }) {
    const [showHideClassName, setShowHideClassName] = useState("");

    useEffect(() => {
        if (show) {
            setShowHideClassName('modal display-block');
        } else {
            setShowHideClassName('modal display-none');
        }
    }, [show]);
    // const [title, setTitle] = useState("");

    const hideModal = () => {
        handleClose(false);
    };

    // const hideModal = () => {
    //     setIsOpen(false);
    //     setTitle("Transitioning...");
    // };

    return (
        <div className={showHideClassName} id="footerModal" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">{modalHeading}</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                    </div>
                    <div className="modal-body">
                        <p dangerouslySetInnerHTML={{ __html: modalBody }}></p>
                        {/* <p>{modalBody}
                        </p> */}
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideModal}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}