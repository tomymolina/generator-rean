'use strict';

var _ = require('lodash');

function or(propertyName, values) {
	return function (value, props) {
		return values.lastIndexOf(props[propertyName]) > -1;
	};
}

module.exports = [
	{
		name: 'type',
		default: 'string',
		type: 'list',
		required: true,
		choices: ['string', 'number', 'date', 'object', 'array', 'boolean'],
		message: 'Which "type" is your attribute "%name%"?',
		thinky : {
			parse : function(val) {
				return val + '()';
			}
		}
    },
	{
		name: 'required',
		default: false,
		type: 'confirm',
		message: 'Is the attribute "%name%" "required"?'
    },
	{
		name: 'default',
		prerequisites: {
			'!type': 'boolean',
			required: false
		},
		casts: ['date', 'number', 'string'],
		message: 'What is the "default" value of "%name%"?',
		postrequisites: function (val, params) {
			if (typeof params.type === 'string') {
				return val.length > 0;
			}

			return true;
		}
    },
	{
		name: 'default',
		type: 'confirm',
		default: true,
		prerequisites: {
			type: 'boolean',
			required: false
		},
		casts: ['boolean'],
		message: 'What is the "default" value of "%name%"?',
		thinky : {
			parse: function(value) {
				return 'default(' + value + ')';
			}
		}
    }, {
		name : 'additional',
		type: 'list',
		choices: ['none', 'alphanum', 'email', 'lowercase', 'uppercase'],
		prerequisites : {
			type: 'string'
		},
		message: 'Select the "additional" property for "%name%":',
		postrequisites : function(val) {
			return val !== 'none';
		},
		thinky: {
			parse : function(val) {
				return val + '()';
			}
		}
	},
	{
		name: 'min',
		prerequisites: or('type', ['string', 'number', 'integer']),
		postrequisites: function (val) {
			return val > 0;
		},
		required: false,
		casts: ['integer']
    },
	{
		name: 'max',
		prerequisites: or('type', ['string', 'number', 'integer']),
		postrequisites: function (val, properties) {
			return properties.min ? val > properties.min : val > 0;
		},
		required: false,
		casts: ['integer']
    },
	{
		name: 'length',
		prerequisites: {
			type: 'string',
			min: undefined,
			max: undefined
		},
		casts: ['integer'],
		postrequisites: function (val, properties) {
			return val > 0;
		}
	},
	{
		name: 'enum',
		prerequisites: {
			type: 'string',
			min: undefined,
			max: undefined,
			length: undefined,
			additional : undefined,
		},
		message: 'What are the "enum" allowed values for "%name%"?',
		postrequisites : function(val){
			return val.split(',').length > 1;
		},
		transform: function(val, def){
			var toret = _.map(val.split(','), _.trim);
			return toret;
		}
	},
	{
		name: 'min',
		prerequisites: {
			type: 'date'
		},
		casts: ['date']
	}, {
		name: 'max',
		prerequisites: {
			type: 'date'
		},
		casts: ['date'],
		postrequisites: function (val, properties) {
			return properties.min ? val > properties.min : true;
		}
	}
];
