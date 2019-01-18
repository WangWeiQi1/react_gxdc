import Jsonp from 'jsonp'

export default class Axios {
	static jsonp(options) {
		return new Promise((resolve, reject) => {
			Jsonp(options.url, {
				param: 'callback'
			}, function(err, response) {
				// debugger; //设置断点用
				if (response.status === 'success') {
					resolve(response);
				} else {
					reject(response.message);
				}
			})
		})
	}
}