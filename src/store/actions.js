const type = {
	MENUNAME: 'MENUNAME'
}

export const setSelectAndMenuName = (menuName, selectedKeys) => {
	return (dispatch) => {
		const action = {
			type: type.MENUNAME,
			menuName,
			selectedKeys
		}
		dispatch(action)
	}
}