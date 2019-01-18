import React, {
	Component
} from 'react';

import {
	Card,
	Form,
	Button,
	Input,
	Checkbox,
	Radio,
	Select,
	Switch,
	DatePicker,
	TimePicker,
	Upload,
	Icon,
	InputNumber
} from 'antd'

import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class RegisterForm extends Component {
	state = {};
	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({
				loading: true
			});
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			this.getBase64(info.file.originFileObj, imageUrl => this.setState({
				userImg: imageUrl,
				loading: false,
			}));
		}
	}
	handleSubmit = () => {
		let userInfo = this.props.form.getFieldsValue();
		console.log(JSON.stringify(userInfo))
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: 24,
				sm: 4
			},
			wrapperCol: {
				xs: 24,
				sm: 12
			}
		}
		const offsetLayout = {
			wrapperCol: {
				xs: 24,
				sm: {
					span: 12,
					offset: 4
				}
			}
		}
		const obj = {
			minRows: 4,
			maxRows: 6
		}
		return (
			<div>
				<Card title="注册表单">
					<Form layout="horizontal">
						<FormItem label="用户名" {...formItemLayout}>
							{
								getFieldDecorator('userName', {
									initialValue: '',
									rules: [
										{
											required: true,
											message: '用户名不能为空'
										}
									]
								})(
									<Input placeholder="请输入用户名" />
								)
							}
						</FormItem>
						<FormItem label="密码" {...formItemLayout}>
							{
								getFieldDecorator('password', {
									initialValue: '',
									rules: [
										{
											required: true,
											message: '密码不能为空'
										}
									]
								})(
									<Input type="password" placeholder="请输入密码" />
								)
							}
						</FormItem>
						<FormItem label="性别" {...formItemLayout}>
							{
								getFieldDecorator('sex', {
									initialValue: '1'
								})(
									<RadioGroup>
										<Radio value="1">男</Radio>
										<Radio value="2">女</Radio>
									</RadioGroup>
								)
							}
						</FormItem>
						<FormItem label="年龄" {...formItemLayout}>
							{
								getFieldDecorator('age', {
									initialValue: 18
								})(
									<InputNumber />
								)
							}
						</FormItem>
						<FormItem label="当前状态" {...formItemLayout}>
							{
								getFieldDecorator('status', {
									initialValue: '2'
								})(
									<Select>
										<Option value="1">咸鱼一条</Option>
										<Option value="2">风华浪子</Option>
										<Option value="3">北大才子</Option>
										<Option value="4">百度FE</Option>
										<Option value="5">创业者</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="爱好" {...formItemLayout}>
							{
								getFieldDecorator('interest', {
									initialValue: ['2','5']
								})(
									<Select mode="multiple">
										<Option value="1">游泳</Option>
										<Option value="2">篮球</Option>
										<Option value="3">足球</Option>
										<Option value="4">羽毛球</Option>
										<Option value="5">游戏</Option>
										<Option value="6">爬山</Option>
										<Option value="7">写代码</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="是否已婚" {...formItemLayout}>
							{
								getFieldDecorator('isMarried', {
									valuePropName: 'checked',
									initialValue: true
								})(
									<Switch />
								)
							}
						</FormItem>
						<FormItem label="生日" {...formItemLayout}>
							{
								getFieldDecorator('birthday', {
									initialValue: moment('2019-01-18 16:22:22')
								})(
									<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
								)
							}
						</FormItem>
						<FormItem label="联系地址" {...formItemLayout}>
							{
								getFieldDecorator('address', {
									initialValue: '北京市海淀区奥林匹克公园'
								})(
									<TextArea
										autosize={obj}
									/>
								)
							}
						</FormItem>
						<FormItem label="早起时间" {...formItemLayout}>
							{
								getFieldDecorator('time')(
									<TimePicker />
								)
							}
						</FormItem>
						<FormItem label="头像" {...formItemLayout}>
							{
								getFieldDecorator('userImg')(
									<Upload
										listType="picture-card"
										showUploadList={false}
										action="//jsonplaceholder.typicode.com/posts/"
										onChange={this.handleChange}
									>
										{this.state.userImg ? <img src={this.state.userImg} alt=""/> : <Icon type="plus" />}
									</Upload>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							{
								getFieldDecorator('read')(
									<Checkbox>我已阅读过<a href="/">慕课协议</a></Checkbox>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							<Button type="primary" onClick={this.handleSubmit}>注册</Button>
						</FormItem>
					</Form>
				</Card>
      		</div>
		);
	}
}

export default Form.create()(RegisterForm);