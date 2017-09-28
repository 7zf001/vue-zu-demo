import * as types from './mutation-types.js'

const matutaions = {
	[types.SET_GZ_HOUSE_INFO](state, GzHouseInfo) {
		let tag_str = GzHouseInfo.tag_list.toString();
		
		/*let housePhoto = [
			GzHouseInfo.image_1,
			GzHouseInfo.image_2,
			GzHouseInfo.image_3,
			GzHouseInfo.image_4
		]
		let newHousePhoto = housePhoto.filter((value) => {
			return value === '' ? false : true
		}).map((value) => {
			return host + value
		})

		GzHouseInfo.housePhoto = newHousePhoto*/
		GzHouseInfo.tag_list = tag_str.split(",")

		state.GzHouseInfo = GzHouseInfo
	}
}

export default matutaions