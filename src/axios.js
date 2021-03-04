import axios from 'axios'

export class Axios {
	constructor() {
		return axios.create({
			baseURL: 'http://127.0.0.1:8000/api',
		})
	}
}

export default new Axios()
