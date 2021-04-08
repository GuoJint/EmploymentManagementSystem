'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let total = 0
	let hasJob= 0
	const db = uniCloud.database()
	const totalRes = await db.collection('user')
	.where({'semester': `${event.semester}`})
	.get()
	const hasJobRes = await db.collection('job')
	.where( {
		'semester': `${event.semester}`,
		'jobtypes': `合同`
	})
	.get()
	if (totalRes.data.length != 0 && hasJobRes.data.length != 0) {
		total = totalRes.data.length
		hasJob = hasJobRes.data.length
		if (hasJob/total <= 0) {
			return {
				'rate': '暂无就业率~'
			}
		} else {
			return {
				'rate': hasJob/total,
			}
		}
	} else {
		return {
			'rate': '暂无就业率~'
		}
	}
	//返回数据给客户端
	
};
