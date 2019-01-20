import React from 'react'

import {
	Card
} from 'antd';

import axios from '../../axios/index'

import './detail.less'

export default class Detail extends React.Component {
	state = {
		orderInfo: {}
	}
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
				this.setState({
					orderInfo: res.result
				})
				//当接口数据获取成功的时候调用地图接口
				this.renderMap(res.result);
			}
		})
	}

	//地图初始化
	renderMap = (result) => {
		//创建地图实例
		//因为react是单页面应用 使用的类必须通过import导入 所以会报undefined错误
		//但实际上我们已经引入成功了这个库
		//所以我们要把这个类挂载到window上就可以解决了
		this.map = new window.BMap.Map('orderDetailMap');
		//设置地图中心坐标点
		this.map.centerAndZoom("北京", 11);
		//调用添加地图控件函数
		this.addMapControl();
		//调用函数绘制路线图
		this.drawBikeRoute(result.position_list);
		//调用函数绘制服务区
		this.drawServiceArea(result.area);
	}

	//添加地图控件
	addMapControl = () => {
		let map = this.map;
		//添加缩放控件
		map.addControl(new window.BMap.ScaleControl({
			anchor: window.BMAP_ANCHOR_TOP_RIGHT
		}))
		//添加导航控件
		map.addControl(new window.BMap.NavigationControl({
			anchor: window.BMAP_ANCHOR_TOP_LEFT
		}))
	}

	//绘制用户的行驶路线图
	drawBikeRoute = (positionList) => {
		let map = this.map;
		let startPoint = '';
		let endPoint = '';
		if (positionList.length) {
			//获取第一个坐标点为起始坐标点
			let first = positionList[0];
			//获取最后一个坐标点为结束坐标点
			let last = positionList[positionList.length - 1];
			//设置起始坐标点
			startPoint = new window.BMap.Point(first.lon, first.lat);
			//创建一个起始坐标点的图标 并设置其大小 以及image大小
			let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
				imageSize: new window.BMap.Size(36, 42),
				//停靠位置
				anchor: new window.BMap.Size(36, 42)
			})
			//把起点坐标和起点图标设置给marker
			let startMarker = new window.BMap.Marker(startPoint, {
				icon: startIcon
			});
			//生成起始坐标点
			this.map.addOverlay(startMarker);

			//生成结束坐标点过程
			endPoint = new window.BMap.Point(last.lon, last.lat);
			let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
				imageSize: new window.BMap.Size(36, 42),
				anchor: new window.BMap.Size(36, 42)
			})
			let endMarker = new window.BMap.Marker(endPoint, {
				icon: endIcon
			});
			this.map.addOverlay(endMarker);

			//链接路线图
			let trackPoint = [];
			for (let i = 0; i < positionList.length; i++) {
				let point = positionList[i];
				trackPoint.push(new window.BMap.Point(point.lon, point.lat));
			}

			let polyline = new window.BMap.Polyline(trackPoint, {
				strokeColor: '#1869AD',
				storkeWeight: 3,
				strokeOpacity: 1
			})
			this.map.addOverlay(polyline);
			this.map.centerAndZoom(endPoint, 11);
		}
	}

	//绘制服务区
	drawServiceArea = (areaList) => {
		let trackPoint = [];
		for (let i = 0; i < areaList.length; i++) {
			let point = areaList[i];
			trackPoint.push(new window.BMap.Point(point.lon, point.lat));
		}
		let polygon = new window.BMap.Polygon(trackPoint, {
			strokeColor: '#CE0000',
			storkeWeight: 4,
			strokeOpacity: 1,
			fillColor: '#ff8605',
			fillOpacity: 0.4
		})
		this.map.addOverlay(polygon);
	}

	render() {
		let orderInfo = this.state.orderInfo || {};
		return (
			<div>
				<Card>
					<div id="orderDetailMap" className="orderMap"></div>
					<div className="detailItems">
						<div className="itemTitle">基础信息</div>
						<ul className="detailForm">
							<li>
								<div className="detailFormLeft">用车模式</div>
								<div className="detailFormContent">{orderInfo.mode === 1 ? '服务区' : '停车点'}</div>
							</li>
							<li>
								<div className="detailFormLeft">订单编号</div>
								<div className="detailFormContent">{orderInfo.order_sn}</div>
							</li>
							<li>
								<div className="detailFormLeft">车辆编号</div>
								<div className="detailFormContent">{orderInfo.bike_sn}</div>
							</li>
							<li>
								<div className="detailFormLeft">用户姓名</div>
								<div className="detailFormContent">{orderInfo.user_name}</div>
							</li>
							<li>
								<div className="detailFormLeft">手机号码</div>
								<div className="detailFormContent">{orderInfo.mobile}</div>
							</li>
						</ul>
					<div className="detailItems1">
						<div className="itemTitle">行驶轨迹</div>
							<ul className="detailForm">
								<li>
									<div className="detailFormLeft">行程起点</div>
									<div className="detailFormContent">{orderInfo.start_location}</div>
								</li>
								<li>
									<div className="detailFormLeft">行程终点</div>
									<div className="detailFormContent">{orderInfo.end_location}</div>
								</li>
								<li>
									<div className="detailFormLeft">行驶里程</div>
									<div className="detailFormContent">{orderInfo.distance / 1000}公里</div>
								</li>
							</ul>
						</div>
					</div>
				</Card>
			</div>
		)
	}
}