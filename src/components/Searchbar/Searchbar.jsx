import { Component } from 'react';
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

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChangeQuery = ({ target: { value } }) => {
    this.setState({ searchQuery: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleSearch(this.state.searchQuery);

    if (this.state.searchQuery.trim() === '') {
      toast.info('Enter a search query', notifyOptions);

      return;
    }

    // this.props.onSubmit(this.state.searchQuery);

    // this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <ButtonForm type="submit">
            <FiSearch size={24} />
            <LabelButton></LabelButton>
          </ButtonForm>

          <InputButton
            type="text"
            name="query"
            value={this.state.searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeQuery}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
