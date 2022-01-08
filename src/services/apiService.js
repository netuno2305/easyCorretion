const serialize = (obj, prefix) => {
	const str = []

	for (let p in obj) {
		if (obj.hasOwnProperty(p) && obj[p] !== null && obj[p] !== "") {
			var k = prefix ? prefix + "[" + p + "]" : p,
				v
			if (obj[p] instanceof Date) {
				v = obj[p].toJSON()
			} else {
				v = obj[p]
			}

			str.push(
				v !== null && typeof v === "object"
					? serialize(v, k)
					: encodeURIComponent(k) + "=" + encodeURIComponent(v)
			)
		}
	}
	return str.join("&")
}

exports.serialize = serialize