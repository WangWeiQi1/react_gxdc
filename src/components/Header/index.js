import React, {
	Component
} from 'react'
import {
	Row,
	Col
} from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import axios from '../../axios'

import {
	connect
} from 'react-redux'

class Header extends Component {
	state = {}
	componentDidMount() {
		this.setState({
			username: 'wwq'
		})
		setInterval(() => {
			let sysTime = Utils.formatDate(new Date().getTime());
			this.setState({
				sysTime
			})
		}, 1000)
		this.getWeatherAPIData();
	}
	getWeatherAPIData() {
		let city = '北京';
		axios.jsonp({
			url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
		}).then(res => {
			if (res.status === 'success') {
				let data = res.results[0].weather_data[0];
				this.setState({
					dayPictureUrl: data.dayPictureUrl,
					weather: data.weather
				})
			}
		})
	}
	render() {
		const menuType = this.props.menuType;
		let menuName = sessionStorage.getItem('menuName');
		return (
			<div className="header">
				<Row className="headerTop">
					{
						menuType ? 
						<Col span={6} className="logo">
							<img src="/assets/logo-ant.svg" alt=""/>
							<span>IMooc 通用管理系统</span>
						</Col> : ''
					}
					<Col span={menuType ? 18 : 24}>
						<span>欢迎,{this.state.username}</span>
						<a href="/aaa">退出</a>
					</Col>
				</Row>
				{
					menuType ? '' :
					<Row className="breadcrumb">
						<Col span={4} className="breadcrumbTitle">
							{menuName}
						</Col>
						<Col span={20} className="weather">
							<span className="date">{this.state.sysTime}</span>
							<span className="weatherImg">
								<img src={this.state.dayPictureUrl} alt=""/>
							</span>
							<span className="weatherDetail">{this.state.weather}</span>
						</Col>
					</Row>
				}
			</div>
		)
	}
}

export default connect()(Header);