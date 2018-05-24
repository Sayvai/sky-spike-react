import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData, send } from '../../actions/form-actions';
import styles from './form.styl';
import { Button, Input, Select, Checkbox } from '@material-ui/core';

const FORM_FIELD_TYPES = {
  TEXT: 'STRING',
  SELECT: 'REF_CODE',
  BOOLEAN: 'BOOLEAN'
};

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formData: {}};
  }

  componentDidMount() {
    this.props.fetchForm();
  }

  handleChange = event => {
    this.setState({ [event.target.getAttribute('name')]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.sendFormData(this.state.formData);
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        {this.getFields()}
        <Button className="submit-button" variant="raised" color="primary" onClick={this.handleSubmit}>Save</Button>
      </form>
    );
  }

  getFields = () => {
    return this.props.fields.map(field => {
      let options;
      switch (field.datagramValueType) {
        case FORM_FIELD_TYPES.SELECT:
          options = field.options.map(option => <option key={option} value={option}>{option}</option>);
          return (
            <Select key={field.name}
              type='checkbox'
              name={field.name}
              value={this.state.formData[field.name]}
              onChange={this.handleChange}
              native={true}>
              {options}
            </Select>
          );

        case FORM_FIELD_TYPES.BOOLEAN:
          return <label key={field.name}>
            <Checkbox name={field.name}
              value={this.state.formData[field.name]}
              onChange={this.handleChange} />
            {field.name}
          </label>;

        case FORM_FIELD_TYPES.TEXT:
        default:
          return <Input key={field.name}
            type='text'
            name={field.name}
            placeholder={field.name}
            value={this.state.formData[field.name]}
            onChange={this.handleChange} />;
      }
    });
  }
}

// connect app state to container
const mapStateToProps = state => ({ fields: state.form.fields });
const mapDispatchToProps = dispatch => ({
  fetchForm: () => { dispatch(getData()); },
  sendFormData: (data) => { dispatch(send(data)); }
});
Form.propTypes = {
  fields: PropTypes.array.isRequired,
  fetchForm: PropTypes.func.isRequired,
  sendFormData: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);