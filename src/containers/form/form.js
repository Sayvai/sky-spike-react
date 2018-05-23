import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData } from '../../actions/form-actions';
import styles from './form.styl';
import Button from '@material-ui/core/Button';

const FORM_FIELD_TYPES = {
  TEXT: 'STRING',
  SELECT: 'REF_CODE',
  BOOLEAN: 'BOOLEAN'
};

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchForm();
  }

  handleChange = event => {
    this.setState({ [event.target.getAttribute('name')]: event.target.value });
  }

  handleSubmit = event => {
    alert('A name was submitted: ' + this.state);
    event.preventDefault();
  }

  render() {
    let fieldList = this.props.fields.map(field => {
      let controller;
      switch (field.datagramValueType) {
        case FORM_FIELD_TYPES.SELECT:
          controller = (
            <select type='checkbox' name={field.name} value={this.state[field.name]} onChange={this.handleChange}>
              {field.options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          );
          break;

        case FORM_FIELD_TYPES.BOOLEAN:
          controller = <input type='checkbox' name={field.name} value={this.state[field.name]} onChange={this.handleChange} />;
          break;

        case FORM_FIELD_TYPES.TEXT:
        default:
          controller = <input type='text' name={field.name} value={this.state[field.name]} onChange={this.handleChange} />;
      }
      return <label key={field.name}>{field.name}{controller}</label>;
    });
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        {fieldList}
        <Button variant="raised" color="primary">Save</Button>
      </form>
    );
  }
}

// connect store state to container
const mapStateToProps = state => ({ fields: state.form.fields });
const mapDispatchToProps = dispatch => ({fetchForm: () => { dispatch(getData()); }});
Form.propTypes = {
  fields: PropTypes.array.isRequired,
  fetchForm: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);