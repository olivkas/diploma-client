import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
// import Malfunction from '../malfunctions/Malfunction';

export const Modal = ({ children, open, onExited, header, ...rest }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (open) {
      setShowModal(true);
    }
  }, [open]);
  function startExitAnimation() {
    setShowModal(false);
  }

  function onExitAnimationEnd() {
    onExited();
  }
  console.log(header);

  console.log(children);
  return (
    <Dialog
      {...rest}
      open={showModal}
      onClose={startExitAnimation}
      onExited={onExitAnimationEnd}
      maxWidth='lg'
    >
      <DialogContent>
        <div className='modalDgHeader'>
          <div className='modalDgTitle'>{header}</div>
          <i
            className='fa fa-times fa-lg'
            aria-hidden='true'
            onClick={onExitAnimationEnd}
          ></i>
        </div>
        <hr />
        {children}
        {/* <Component /> */}
      </DialogContent>
    </Dialog>
  );
};

Modal.propTypes = {
  ...Dialog.propTypes,
};

export default Modal;
