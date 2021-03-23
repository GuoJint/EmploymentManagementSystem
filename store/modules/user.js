export default {
	state: () => ({
		userName: '',
		userNumber: '',
		userSchool: '',
		userType: '',
	}),
	mutations: {
		SET_USER_INFO (state, val) {
			state.userName = val
		},
		SET_USER_NUMBER (state, val) {
			state.userNumber = val
		},
		SET_USER_SCHOOL (state, val) {
			state.userSchool = val
		},
		SET_USER_TYPE (state, val) {
			state.userType = val
		}
	}
}