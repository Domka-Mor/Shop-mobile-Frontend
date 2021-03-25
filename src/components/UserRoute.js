import React from 'react';
import { Redirect } from 'react-router-dom';
import {ProductContext} from '../context';


export default class UserRoute extends React.Component {

	static contextType = ProductContext;

	render() {

		const Component = this.props.component;
		const isAuthenticated = this.context.token;

		return (
			isAuthenticated ? 
	      	(<Component />) 
	      	:   
	      	(<Redirect to={{ pathname: '/login' }} />)
		)
	}
}