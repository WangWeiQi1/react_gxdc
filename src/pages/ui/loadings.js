import React, {
	Component
} from 'react';

import {
	Card,
	Spin,
	Icon,
	Alert
} from 'antd'

class Loadings extends Component {
	render() {
		const icon = <Icon type="loading" style={{fontSize: "24px"}} />
		return (
			<div>
        		<Card title="Spin用法" className="cardWrap">
        			<Spin size="small" />
        			<Spin style={{margin: "0 10px"}} />
        			<Spin size="large" />
        			<Spin indicator={icon} style={{marginLeft: "10px"}} />
        		</Card>
        		<Card title="内容遮罩" className="cardWrap">
        			<Alert
						message="React"
						description="欢迎来到React高级实战课程"
						type="info"
        			/>
        			<Spin tip="加载中...">
        				<Alert
							message="React"
							description="欢迎来到React高级实战课程"
							type="warning"
	        			/>
        			</Spin>
        			<Spin indicator={icon}>
        				<Alert
							message="React"
							description="欢迎来到React高级实战课程"
							type="error"
	        			/>
        			</Spin>
        		</Card>
     	 	</div>
		)
	}
}

export default Loadings;