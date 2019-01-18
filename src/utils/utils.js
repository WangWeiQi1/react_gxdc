export default {
	formatDate(time) {
		if (!time) return '';
		let date = new Date(time);
		return date.getFullYear() + '-' + _addPad(date.getMonth() + 1) + '-' + _addPad(date.getDate()) + ' ' + _addPad(date.getHours()) + ':' + _addPad(date.getMinutes()) + ':' + _addPad(date.getSeconds());
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