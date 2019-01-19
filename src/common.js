import React from 'react'

import {
	Row,
	Col
} from 'antd'

import './style/common.less'

import Header from './components/Header'

class Common extends React.Component {
	render() {
		return (
			<div>
				<Row className="simplePage">
					<Header menuType="second" />
				</Row>
				<Row className="content">
					{this.props.children}
				</Row>
			</div>
		)
	}
}

export default Common;