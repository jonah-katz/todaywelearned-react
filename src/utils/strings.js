export const shorten_name = (name)  =>
	name.split(" ").length > 1 ? (name.split(' ')[0] + ' ' + name.split(' ')[1].charAt(0) + '.') : name
