function getBaseUrlFromCurrentPage() {
	const baseUrl = window.location.protocol + '//' + window.location.host + '/';
	const contextPath = window.location.pathname.split('/')[1]; // Extract the context path

	return baseUrl + contextPath;
}

export { getBaseUrlFromCurrentPage };