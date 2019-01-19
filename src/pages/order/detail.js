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

import './detail.less'

const FormItem = Form.Item;

const Option = Select.Option;

export default class Detail extends React.Component {
	componentDidMount() {
		let orderId = this.props.match.params.orderId;
		if (orderId) {
			this.getDetailInfo(orderId);
		}
	}
	getDetailInfo = (orderId) => {
		axios.ajax({
			url: '/order/detail',
			data: {
				params: {
					orderId: orderId
				}
			}
		}).then(res => {
			if (res.code === 0) {

			}
		})
	}
	render() {
		return (
			<div>
				<Card>
					<div id="orderDetailMap" className="orderMap"></div>
					<div className="detailItems">
						<div className="itemTitle">基础信息</div>
						<ul className="detailForm">
							<li>
								<div className="detailFormLeft">用车模式</div>
								<div className="detailFormContent"></div>
							</li>
							<li>
								<div className="detailFormLeft">订单编号</div>
								<div className="detailFormContent"></div>
							</li>
							<li>
								<div className="detailFormLeft">车辆编号</div>
								<div className="detailFormContent"></div>
							</li>
							<li>
								<div className="detailFormLeft">用户姓名</div>
								<div className="detailFormContent"></div>
							</li>
							<li>
								<div className="detailFormLeft">手机号码</div>
								<div className="detailFormContent"></div>
							</li>
						</ul>
					<div className="detailItems1">
						<div className="itemTitle">行驶轨迹</div>
							<ul className="detailForm">
								<li>
									<div className="detailFormLeft">行程起点</div>
									<div className="detailFormContent"></div>
								</li>
								<li>
									<div className="detailFormLeft">行程终点</div>
									<div className="detailFormContent"></div>
								</li>
								<li>
									<div className="detailFormLeft">行驶里程</div>
									<div className="detailFormContent"></div>
								</li>
							</ul>
						</div>
					</div>
				</Card>
			</div>
		)
	}
}