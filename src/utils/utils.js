export default {
	formatDate(time) {
		if (!time) return '';
		let date = new Date(time);
		return date.getFullYear() + '-' + _addPad(date.getMonth() + 1) + '-' + _addPad(date.getDate()) + ' ' + _addPad(date.getHours()) + ':' + _addPad(date.getMinutes()) + ':' + _addPad(date.getSeconds());
	},
	pagination(data, callback) {
		return {
			onChange: (current) => {
				callback(current)
			},
			current: data.result.page,
			pageSize: data.result.page_size,
			total: data.result.total,
			showTotal: () => {
				return `共${data.result.total}条数据`
			},
			showQuickJumper: true
		}
	}
}

function _addPad(time) {
	let len = time.toString().length;
	let n = 2;
	if (len < n) {
		time = '0' + time;
		len++;
	}
	return time;
}