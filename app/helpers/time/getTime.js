export default (date, separator = ':') => {
	const newDate = date ? new Date(date) : new Date()
	let hours = newDate.getHours()
	// eslint-disable-next-line
	hours = hours < 10 ? '0' + hours : hours
	let minutes = newDate.getMinutes()
	// eslint-disable-next-line
	minutes = minutes < 10 ? '0' + minutes : minutes
	let seconds = newDate.getSeconds()
	// eslint-disable-next-line
	seconds = seconds < 10 ? '0' + seconds : seconds
	// eslint-disable-next-line
	return hours + separator + minutes + separator + seconds
}
