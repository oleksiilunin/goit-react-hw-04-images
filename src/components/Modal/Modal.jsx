import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import { ModalWrapper, Overlay } from './Modal.styled';

const Modal = ({ imageURL, alt, onClickCloseModal }) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onClickCloseModal}>
      <ModalWrapper className="modal">
        <img src={imageURL} alt={alt} />
      </ModalWrapper>
    </Overlay>,
    document.body
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClickCloseModal: PropTypes.func.isRequired,
};

export default Modal;
