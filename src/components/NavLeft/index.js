import React, {
	Component
} from 'react'
import './index.less'
import {
	NavLink
} from 'react-router-dom'
import MenuConfig from '../../config/menuConfig'

import {
	connect
} from 'react-redux'

import * as actions from '../../store/actions'
import {
	Menu
} from 'antd';
const SubMenu = Menu.SubMenu;

class NavLeft extends Component {
	state = {}
	componentDidMount() {
		sessionStorage.removeItem('currentKey');
		const menuTreeNode = this.renderMenu(MenuConfig);
		let _key = window.location.hash.replace(/#|\?.*$/g, '');
		sessionStorage.setItem('currentKey', _key);
		this.setState({
			menuTreeNode,
			// 	currentKey: _key
		})

	}
	//菜单渲染
	renderMenu = (data) => {
		return data.map((menu) => {
			if (menu.children) {
				return (
					<SubMenu title={menu.title} key={menu.key}>
						{this.renderMenu(menu.children)}
					</SubMenu>
				)
			}
			return (
				<Menu.Item title={menu.title} key={menu.key}>
					<NavLink to={menu.key}>{menu.title}</NavLink>
				</Menu.Item>
			)
		})
	}
	render() {
		let current = sessionStorage.getItem('currentKey');
		return (
			<div>
				<div>
					<div className="logo">
					<img src="/assets/logo-ant.svg" alt=""/>
					<h1>Imooc MS</h1>
				</div>
				<Menu 
					onClick={(item) => this.props.handleChangeMenu(item)}
					selectedKeys={[current]}
					theme="dark">
				    {this.state.menuTreeNode}
				</Menu>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		selectedKeys: state.currentKey
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleChangeMenu({
			item,
			key
		}) {
			let menuNames = item.props.title;
			sessionStorage.removeItem('currentKey');
			sessionStorage.removeItem('menuName');
			sessionStorage.setItem('currentKey', key);
			sessionStorage.setItem('menuName', menuNames);
			let current = sessionStorage.getItem('currentKey');
			let menuName = sessionStorage.getItem('menuName');
			let selectedKeys = current;
			dispatch(actions.setSelectAndMenuName(menuName, selectedKeys))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavLeft);