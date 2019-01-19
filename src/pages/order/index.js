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
	componentDidMount() {
		this.request();
	}
	request = () => {
		axios.ajax({
			url: '/order/list',
			data: {
				params: {
					page: this.params.page
				}
			}
		}).then(res => {
			let list = res.result.item_list.map((item, index) => {
				item.key = index;
				return item;
			});
			this.setState({
				list: list,
				pagination: Utils.pagination(res, (current) => {
					this.params.page = current;
					this.request();
				})
			})
		})
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
					<FilterForm />
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

class FilterForm extends React.Component {

	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		return (
			<Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker 
                            	showTime
                            	format="YYYY-MM-DD HH:mm:ss"
                            />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker 
                            	showTime
                            	format="YYYY-MM-DD HH:mm:ss"
                            />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('status')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
		);
	}
}
FilterForm = Form.create({})(FilterForm);