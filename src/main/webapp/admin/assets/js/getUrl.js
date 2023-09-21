function getBaseUrlFromCurrentPage() {
	// Extract and return the base URL from the current page's URL
	return window.location.protocol + '//' + window.location.host + '/';
}

export { getBaseUrlFromCurrentPage };