import { useState } from 'react';
import PropTypes from 'prop-types';

// import { Formik, Form, Field } from 'formik';

import notifyOptions from '../../helpers/toastNotifyOptions';

import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  ButtonForm,
  Form,
  Header,
  InputButton,
  LabelButton,
} from './Searchbar.styled';

export default function Searchbar({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeQuery = ({ target: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.info('Enter a search query', notifyOptions);

      return;
    }

    handleSearch(searchQuery);

    // this.setState({ searchQuery: '' });
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <ButtonForm type="submit">
          <FiSearch size={24} />
          <LabelButton></LabelButton>
        </ButtonForm>

        <InputButton
          type="text"
          name="query"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeQuery}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
