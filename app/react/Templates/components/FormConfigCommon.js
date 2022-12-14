import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field } from 'react-redux-form';
import { connect } from 'react-redux';

import Tip from 'app/Layout/Tip';
import PropertyConfigOption from 'app/Templates/components/PropertyConfigOption';
import { Translate } from 'app/I18N';
import PrioritySortingLabel from './PrioritySortingLabel';

export class FormConfigCommon extends Component {
  getZeroIndex() {
    const { index, data } = this.props;
    const baseZeroIndex = index + data.commonProperties.length;
    return baseZeroIndex;
  }

  renderTitleField() {
    const { index, formState } = this.props;
    let labelClass = 'form-group';
    const labelKey = `commonProperties.${this.getZeroIndex()}.label`;
    const requiredLabel = formState.$form.errors[`${labelKey}.required`];
    const duplicatedLabel = formState.$form.errors[`${labelKey}.duplicated`];
    if (requiredLabel || duplicatedLabel) {
      labelClass += ' has-error';
    }

    return (
      <div className={labelClass}>
        <label htmlFor={`label${index}`}>
          <Translate>Name</Translate>
        </label>
        <Field model={`template.data.commonProperties[${this.getZeroIndex()}].label`}>
          <input id={`label${index}`} className="form-control" />
        </Field>
      </div>
    );
  }

  render() {
    const { index, data } = this.props;
    const property = data.commonProperties[this.getZeroIndex()];

    return (
      <div>
        {property.name === 'title' && this.renderTitleField()}
        <Field model={`template.data.commonProperties[${this.getZeroIndex()}].prioritySorting`}>
          <input id={`prioritySorting${index}`} type="checkbox" />
          &nbsp;
          <PrioritySortingLabel htmlFor={`prioritySorting${index}`} />
        </Field>
        {property.name === 'title' && (
          <PropertyConfigOption
            label="Generated ID"
            model={`template.data.commonProperties[${this.getZeroIndex()}].generatedId`}
          >
            <Tip>
              <Translate>A generated ID will be the default title.</Translate>
            </Tip>
          </PropertyConfigOption>
        )}
      </div>
    );
  }
}

FormConfigCommon.propTypes = {
  data: PropTypes.shape({ commonProperties: PropTypes.array }).isRequired,
  formState: PropTypes.shape({ $form: PropTypes.object }).isRequired,
  index: PropTypes.number,
};

export function mapStateToProps({ template }) {
  return {
    data: template.data,
    formState: template.formState,
  };
}

export default connect(mapStateToProps)(FormConfigCommon);
