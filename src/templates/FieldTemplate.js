import React, { PropTypes } from 'react';
import Label from './LabelTemplate';

/**
 * Custom field template
 * @param props
 * @returns {*}
 * @constructor
 */
const CustomFieldTemplate = ({
	id,
	classNames,
	label,
	children,
	errors,
	help,
	description,
	hidden,
	required,
	displayLabel,
}) => {
	if (hidden) {
		return children;
	}

	return (
		<div className={classNames}>
			{children}
			{displayLabel ? <Label label={label} required={required} id={id}/> : null}
			{displayLabel && description ? description : null}
			{errors}
			{help}
		</div>
	);
};

CustomFieldTemplate.propTypes = {
	id: PropTypes.string,
	classNames: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node.isRequired,
	errors: PropTypes.element,
	rawErrors: PropTypes.arrayOf(PropTypes.string),
	help: PropTypes.element,
	rawHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	description: PropTypes.element,
	rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	hidden: PropTypes.bool,
	required: PropTypes.bool,
	readonly: PropTypes.bool,
	displayLabel: PropTypes.bool,
	fields: PropTypes.object,
	formContext: PropTypes.object,
};

CustomFieldTemplate.defaultProps = {
	hidden: false,
	readonly: false,
	required: false,
	displayLabel: true,
};

export default CustomFieldTemplate;
