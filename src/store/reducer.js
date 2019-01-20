const initialState = {
	currentKey: '',
	menuName: ''
}

export default (state = initialState, action) => {
	switch (action.type) {
		case "MENUNAME":
			return {
				...state,
				menuName: action.menuName,
				currentKey: action.selectedKeys
			}
		default:
			return state
	}
}