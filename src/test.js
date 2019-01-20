import React from 'react'

import axios from 'axios'

import './mock/index'

export default class Test extends React.Component {
	componentDidMount() {
		this.loadTest();
	}
	loadTest() {
		axios.get('/order').then(res => {
			console.log(res.data)
		})
	}
	render() {
		return (
			<div>test-mock</div>
		)
	}
}