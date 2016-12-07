import React, { PropTypes } from 'react';

import RJSForm from 'react-jsonschema-form/lib/index';
import CheckboxWidget from 'react-jsonschema-form/lib/components/widgets/CheckboxWidget';
import Button from 'react-bootstrap/lib/Button';
import ObjectField from './fields/ObjectField';
import StringField from './fields/StringField';
import FieldTemplate from './templates/FieldTemplate';

/**
 * @type {string} After trigger name for field value has changed
 */
const TRIGGER_AFTER = 'after';

const customWidgets = {
	toggle: CheckboxWidget,
};

const customUiSchema = {
	'ui:widget': 'toggle',
};

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.handleSchemaChange = this.handleSchemaChange.bind(this);
		this.handleSchemaSubmit = this.handleSchemaSubmit.bind(this);
	}

	handleSchemaSubmit(changes) {
		if (this.props.onSubmit) {
			this.props.onSubmit(changes);
		}
	}

	/**
	 * Handle changes only if modified field has "ui:trigger" option
	 * @param changes New formData
	 * @param id Form id is provided
	 * @param name Name of the modified field
	 * @param value New value of the field
	 * @param options Options from uiSchema for this field
	 */
	handleSchemaChange(changes, id, name, value, options) {
		const triggers = options && options.trigger;
		if (triggers && triggers.indexOf(TRIGGER_AFTER) !== -1) {
			if (this.props.onChange) {
				this.props.onChange(changes, id, name, value);
			}
		}
	}

	render() {
		const schema = this.props.data && this.props.data.jsonSchema;
		if (!schema) {
			throw Error('You must provide data with valid JSON Schema');
		}

		const uiSchema = {
			...(this.props.data && this.props.data.uiSchema),
			...customUiSchema,
		};

		const formData = this.props.data && this.props.data.properties;

		const customFields = {
			ObjectField,
			StringField,
		};

		const customFormContext = {
			handleSchemaChange: this.handleSchemaChange,
		};

		const actions = this.props.actions ? this.props.actions.map((action, index) => (
			<Button
				key={index}
				bsStyle={action.style}
				type={action.type}
				onClick={action.onClick}
				title={action.title}
			>
				{action.icon ? <i className={action.icon}/> : null }
				{action.label}
			</Button>
		)) : <Button bsStyle="primary" type="submit">Submit</Button>;
		return (
			<RJSForm
				{...this.props}
				schema={schema}
				uiSchema={uiSchema}
				formData={formData}
				formContext={customFormContext}
				fields={customFields}
				FieldTemplate={FieldTemplate}
				widgets={customWidgets}
				onChange={undefined}
				onSubmit={this.handleSchemaSubmit}
			>
				<div className={this.props.buttonBlockClass}>
					{actions}
				</div>
			</RJSForm>
		);
	}
}

Form.propTypes = {
	data: PropTypes.shape({
		jsonSchema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
		properties: PropTypes.object,
	}).isRequired,
	theme: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onSubmit: React.PropTypes.func,
	actions: React.PropTypes.arrayOf(React.PropTypes.shape({
		style: React.PropTypes.string,
		type: React.PropTypes.oneOf(['submit', 'reset', 'button']),
		onClick: React.PropTypes.func,
		label: React.PropTypes.string,
		icon: React.PropTypes.string,
		title: React.PropTypes.string,
	})),
	buttonBlockClass: PropTypes.string,
};

Form.defaultProps = {
	buttonBlockClass: 'form-actions',
};

export default Form;
