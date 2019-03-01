export default (date, separator = ' / ') => {
	const newDate = date ? new Date(date) : new Date()
	let month = newDate.getMonth() + 1
	// eslint-disable-next-line
	month = month < 10 ? '0' + month : month
	let day = newDate.getDay()
	// eslint-disable-next-line
	day = day < 10 ? '0' + day : day
	// eslint-disable-next-line
	return newDate.getFullYear() + separator + month + separator + day
}
