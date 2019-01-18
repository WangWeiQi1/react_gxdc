import React from 'react'

import {
	Card,
	Table,
	Modal,
	Button,
	message
} from 'antd'

import axios from '../../axios/index'

export default class BasicTable extends React.Component {
	state = {
		dataSource2: []
	}
	componentDidMount() {
		const dataSource = [{
			id: '0',
			userName: 'Jack',
			sex: '1',
			status: '1',
			interest: '1',
			birthday: '1997-02-27',
			address: '北京市海淀区奥林匹克公园',
			time: '09:00'
		}, {
			id: '1',
			userName: 'Tom',
			sex: '1',
			status: '1',
			interest: '1',
			birthday: '1997-02-27',
			address: '北京市海淀区奥林匹克公园',
			time: '09:00'
		}, {
			id: '2',
			userName: 'Lily',
			sex: '1',
			status: '1',
			interest: '1',
			birthday: '1997-02-27',
			address: '北京市海淀区奥林匹克公园',
			time: '09:00'
		}]
		dataSource.map((item, index) => {
			return item.key = index;
		})
		this.setState({
			dataSource
		})
		this.request();
	}
	request = () => {
		axios.ajax({
			url: '/table/list',
			data: {
				params: {
					page: 1
				}
			}
		}).then((res) => {
			if (res.code === 0) {
				res.result.map((item, index) => {
					return item.key = index;
				})
				this.setState({
					dataSource2: res.result,
					selectedRowKeys: [],
					selectRows: null
				})
			}
		})
	}
	onRowClick = (record, index) => {
		let selectKey = [index];
		Modal.info({
			title: '信息',
			content: `用户名:${record.userName}`
		})
		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record
		})
	}
	//复选执行删除操作
	handleDelete = () => {
		let rows = this.state.selectRows;
		let ids = [];
		rows.map((item) => {
			return ids.push(item.id);
		})
		Modal.confirm({
			title: '删除提示',
			content: `您确定要删除这些数据吗? ${ids.join(',')}`,
			onOk: () => {
				message.success('删除成功');
				this.request();
			}
		})
	}
	render() {
		const columns = [{
			title: 'id',
			dataIndex: 'id'
		}, {
			title: '用户名',
			dataIndex: 'userName'
		}, {
			title: '性别',
			dataIndex: 'sex',
			render(sex) {
				return sex === 1 ? '男' : '女'
			}
		}, {
			title: '状态',
			dataIndex: 'status',
			render(status) {
				let config = {
					1: '咸鱼一条',
					2: '风华浪子',
					3: '北大才子',
					4: '百度FE',
					5: '创业者'
				}
				return config[status]
			}
		}, {
			title: '爱好',
			dataIndex: 'interest',
			render(interest) {
				let config = {
					1: '游泳',
					2: '篮球',
					3: '足球',
					4: '羽毛球',
					5: '爬山'
				}
				return config[interest]
			}
		}, {
			title: '生日',
			dataIndex: 'birthday'
		}, {
			title: '地址',
			dataIndex: 'address'
		}, {
			title: '早起时间',
			dataIndex: 'time'
		}]
		const rowSelection = {
			type: 'radio',
			selectedRowKeys: this.state.selectedRowKeys
		}
		const rowCheckSelection = {
			type: 'checkbox',
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys, selectRows) => {
				this.setState({
					selectedRowKeys,
					selectRows
				})
			}
		}
		return (
			<div>
				<Card title="基础表格">
					<Table 
						bordered
						columns={columns} 
						dataSource={this.state.dataSource}
						pagination={false}
					/>
				</Card>
				<Card title="动态数据渲染表格-Mock" style={{margin: "10px 0"}}>
					<Table 
						bordered
						columns={columns} 
						dataSource={this.state.dataSource2}
						pagination={false}
					/>
				</Card>
				<Card title="Mock-单选" style={{margin: "10px 0"}}>		
					<Table 
						bordered
						rowSelection={rowSelection}
						onRow={(record,index) => {
					    return {
					      onClick: () => {
					      	this.onRowClick(record,index)
					      }
					    };
					  }}
						columns={columns} 
						dataSource={this.state.dataSource2}
						pagination={false}
					/>
				</Card>
				<Card title="Mock-复选" style={{margin: "10px 0"}}>
					<div style={{marginBottom: "10px"}}>
						<Button type="primary" onClick={this.handleDelete}>删除</Button>
					</div>
					<Table 
						bordered
						rowSelection={rowCheckSelection}
						onRow={(record,index) => {
					    return {
					      onClick: () => {
					      	this.onRowClick(record,index)
					      }
					    };
					  }}
						columns={columns} 
						dataSource={this.state.dataSource2}
						pagination={false}
					/>
				</Card>
			</div>
		)
	}
}