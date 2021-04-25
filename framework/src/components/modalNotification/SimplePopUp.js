import React from 'react';

const SimplePopUp = ({ data: { title, text } = {}, dismiss }) => (
  <div className="modal confirm d-block " tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header justify-content-center">
          <h6 className="modal-title text-center bold">{title}</h6>
        </div>
        <div className="modal-body text-center">
          <div className="one-rem-mb">{text}</div>
          <button type="button" className="btn btn-primary bold rouded-button has-box-shadow min-width-btn" onClick={dismiss}>
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default SimplePopUp;
