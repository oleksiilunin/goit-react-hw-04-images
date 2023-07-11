import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import { Image, Item } from './ImageGalleryItem.styled';

function ImageGalleryItem({ id, tags, webformatURL, largeImageURL }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onKeyDownCloseModal = event => {
      if (event.code === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDownCloseModal);

    return () => {
      document.removeEventListener('keydown', onKeyDownCloseModal);
    };
  }, []);

  const onClickCloseModal = event => {
    if (event.target.classList.contains('overlay')) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Item key={id} onClick={() => setIsModalOpen(true)}>
        <Image src={webformatURL} alt={tags} />
      </Item>
      {isModalOpen && (
        <Modal
          imageURL={largeImageURL}
          alt={tags}
          onClickCloseModal={onClickCloseModal}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
