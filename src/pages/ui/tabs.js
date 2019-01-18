import React, {
	Component
} from 'react';

import {
	Card,
	Tabs,
	message,
	Icon
} from 'antd'

import './ui.less'

class Tab extends Component {
	newTabIndex = 0;
	callback(key) {
		message.info('Hi,您选择了页签:' + key)
	}
	componentWillMount() {
		const panes = [{
			title: 'Tab 1',
			content: 'Tab 1',
			key: '1'
		}, {
			title: 'Tab 2',
			content: 'Tab 2',
			key: '2'
		}, {
			title: 'Tab 3',
			content: 'Tab 3',
			key: '3'
		}]
		this.setState({
			panes,
			activeKey: panes[0].key
		})
	}
	handleOnChange(activeKey) {
		this.setState({
			activeKey
		})
	}
	onEdit = (targetKey, action) => {
		this[action](targetKey);
	}
	add = () => {
		const panes = this.state.panes;
		const activeKey = `newTab${this.newTabIndex++}`;
		panes.push({
			title: activeKey,
			content: 'New Tab Pane',
			key: activeKey
		});
		this.setState({
			panes,
			activeKey
		});
	}

	remove = (targetKey) => {
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
		}
		this.setState({
			panes,
			activeKey
		});
	}

	render() {
		const TabPane = Tabs.TabPane;
		return (
			<div>
				<Card title="Tab页签" className="cardWrap">
					<Tabs defaultActiveKey="1" onChange={(activeKey) => this.callback(activeKey)}>
					  <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
					  <TabPane tab="Tab 2" key="2" disabled>Content of Tab Pane 2</TabPane>
					  <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
					</Tabs>
				</Card>
				<Card title="Tab带图的页签" className="cardWrap">
					<Tabs defaultActiveKey="1">
					  <TabPane tab={<span><Icon type="plus" />Tab1</span>} key="1">Content of Tab Pane 1</TabPane>
					  <TabPane tab={<span><Icon type="edit" />Tab1</span>} key="2">Content of Tab Pane 2</TabPane>
					  <TabPane tab={<span><Icon type="delete" />Tab1</span>} key="3">Content of Tab Pane 3</TabPane>
					</Tabs>
				</Card>
				<Card title="Tab动态页签" className="cardWrap">
					<Tabs 
						activeKey={this.state.activeKey}
						onChange={(activeKey) => {this.handleOnChange(activeKey)}}
						type="editable-card"
						onEdit={this.onEdit}
					>
					  {
					  	this.state.panes.map((item,index) => {
					  		return <TabPane key={item.key} tab={item.title} />
					  	})
					  }
					</Tabs>
				</Card>
			</div>
		);
	}
}

export default Tab;