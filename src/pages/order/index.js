import React from 'react'

import {
	Card,
	Button,
	Table,
	Form,
	Select,
	Modal,
	DatePicker,
	rowSelection,
	message
} from 'antd';

import BaseForm from '../../components/BaseForm'

import axios from '../../axios/index'

import Utils from '../../utils/utils'

const FormItem = Form.Item;

const Option = Select.Option;

export default class Order extends React.Component {
	state = {
		orderInfo: {},
		order_del_show: false
	}
	params = {
		page: 1
	}
	formList = [{
		type: 'SELECT',
		label: '城市',
		field: 'city',
		placeholder: '全部',
		initialValue: 1,
		width: 80,
		list: [{
			id: 0,
			name: "全部"
		}, {
			id: 1,
			name: "北京"
		}, {
			id: 2,
			name: "天津"
		}, {
			id: 3,
			name: "上海"
		}]
	}, {
		type: '时间查询'
	}, {
		type: 'SELECT',
		label: '订单状态',
		field: 'status',
		placeholder: '全部',
		initialValue: 1,
		width: 80,
		list: [{
			id: 0,
			name: "全部"
		}, {
			id: 1,
			name: "进行中"
		}, {
			id: 2,
			name: "结束行程"
		}]
	}]
	componentDidMount() {
		this.request();
	}
	handleFilter = (params) => {
		this.params = params;
		this.request();
	}
	request = () => {
		axios.requestList(this, '/order/list', this.params)
	}
	onRowClick(record, index) {
		let selectKey = [index];
		this.setState({
			selectedRowKeys: selectKey,
			selectItem: record
		})
	}
	handleConfirm = () => {
		let item = this.state.selectItem;
		if (!item) {
			Modal.info({
				title: '消息',
				content: '请先选择一条订单'
			})
			return;
		}
		axios.ajax({
			url: '/ebike_info',
			data: {
				params: {
					orderId: item.id
				}
			}
		}).then(res => {
			if (res.code === 0) {
				this.setState({
					orderInfo: res.result,
					order_del_show: true
				})
			}
		})
	}
	handleFinishOrder = () => {
		let item = this.state.selectItem;
		axios.ajax({
			url: '/finish_order',
			data: {
				params: {
					orderId: item.id
				}
			}
		}).then(res => {
			if (res.code === 0) {
				message.success(res.result)
				this.setState({
					selectedRowKeys: null,
					order_del_show: false
				})
				this.request();
			}
		})
	}
	openOrderDetail = () => {
		let item = this.state.selectItem;
		if (!item) {
			Modal.info({
				title: '消息',
				content: '请先选择一条订单'
			})
			return;
		}
		window.open(`/#/common/order/detail/${item.id}`, '_blank');
	}
	render() {
		const columns = [{
			title: '订单编号',
			dataIndex: 'order_sn'
		}, {
			title: '车辆编号',
			dataIndex: 'bike_sn'
		}, {
			title: '用户名',
			dataIndex: 'user_name'
		}, {
			title: '手机号',
			dataIndex: 'mobile'
		}, {
			title: '里程',
			dataIndex: 'distance',
			render(distance) {
				return distance / 1000 + 'Km'
			}
		}, {
			title: '行驶时长',
			dataIndex: 'total_time'
		}, {
			title: '状态',
			dataIndex: 'status'
		}, {
			title: '开始时间',
			dataIndex: 'start_time'
		}, {
			title: '结束时间',
			dataIndex: 'end_time'
		}, {
			title: '订单金额',
			dataIndex: 'total_fee'
		}, {
			title: '实付金额',
			dataIndex: 'user_pay'
		}]
		const selectedRowKeys = this.state.selectedRowKeys;
		const rowSelection = {
			type: 'radio',
			selectedRowKeys
		}
		const formItemLayout = {
			labelCol: {
				span: 5
			},
			wrapperCol: {
				span: 19
			}
		}
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>
				<Card style={{marginTop: "10px"}}>
					<Button type="primary" style={{marginRight: "10px"}} onClick={this.openOrderDetail}>订单详情</Button>
					<Button type="primary" onClick={this.handleConfirm}>结束订单</Button>
				</Card>
				<div className="contentWrap">
					<Table 
						bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                        	return {
                        		onClick: () => {
                        			this.onRowClick(record,index)
                        		}
                        	}
                        }}
					/>
				</div>
				<Modal 
					title="结束订单"
					visible={this.state.order_del_show}
					onCancel={() => {
						this.setState({
							order_del_show: false
						})
					}}
					onOk={this.handleFinishOrder}
					width={600}
				>
					<Form layout="horizontal">
						<FormItem label="车辆编号" {...formItemLayout}>
							{this.state.orderInfo.bike_sn}
						</FormItem>
						<FormItem label="剩余电量" {...formItemLayout}>
							{this.state.orderInfo.battery + '%'}
						</FormItem>
						<FormItem label="行程开始时间" {...formItemLayout}>
							{this.state.orderInfo.start_time}
						</FormItem>
						<FormItem label="当前位置" {...formItemLayout}>
							{this.state.orderInfo.location}
						</FormItem>
					</Form>
				</Modal>
			</div>
		)
	}
}