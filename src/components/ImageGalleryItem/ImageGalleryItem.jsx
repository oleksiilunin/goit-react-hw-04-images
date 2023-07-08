import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import { Image, Item } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDownCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDownCloseModal);
  }

  onClickCloseModal = event => {
    if (event.target.classList.contains('overlay')) {
      this.setState({ isModalOpen: false });
    }
  };

  onKeyDownCloseModal = event => {
    if (event.code === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  handleItemClick = () => {
    this.setState({ isModalOpen: true });
  };

  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <Item key={id} onClick={this.handleItemClick}>
          <Image src={webformatURL} alt={tags} />
        </Item>
        {isModalOpen && (
          <Modal
            imageURL={largeImageURL}
            alt={tags}
            onClickCloseModal={this.onClickCloseModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
