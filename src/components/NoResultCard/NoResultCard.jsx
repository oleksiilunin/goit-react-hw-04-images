import React from 'react';

import PropTypes from 'prop-types';

import noResultImage from '../../assets/Not_found_2.png';
import { CardImage, CardText, CardWrapper } from './NoResultCard.styled';

const NoResultCard = ({ children }) => {
  return (
    <CardWrapper>
      <CardImage
        src={noResultImage}
        alt="No found"
        width="480
			"
      />
      <CardText>{children}</CardText>
    </CardWrapper>
  );
};

NoResultCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoResultCard;
