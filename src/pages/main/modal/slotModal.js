import React, { useEffect, useState } from 'react'

function Slotmodal({ show }) {
    const [showHideClassName, setShowHideClassName] = useState("");
    useEffect(() => {
        if (show) {
            setShowHideClassName('modal display-block');
        } else {
            setShowHideClassName('modal display-none');
        }
    }, [show]);

    const hideModal = () => {
        setShowHideClassName('modal display-none');
    };

    return (
        <div className={showHideClassName} id="slotModal" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Check Slot</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="table-responsive ">
                            <table className="table table-bordered table-accent">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>DOB</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sanjay</td>
                                        <td>25-03-2012</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Slotmodal