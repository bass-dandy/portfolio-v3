export function clamp(val: number, min: number, max: number) {
	return Math.max(
		Math.min(val, max),
		min
	);
}

export function download(url: string) {
	const link = document.createElement('a');
	link.href = url;
	link.download = url.substr(url.lastIndexOf('/') + 1);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
