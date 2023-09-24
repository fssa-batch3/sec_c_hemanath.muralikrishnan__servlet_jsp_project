function startSpinner() {
	const loadingOverlay = document.getElementById('loading-overlay');
	loadingOverlay.style.display = 'flex'; // Display the overlay
}


function endSpinner() {
	const loadingOverlay = document.getElementById('loading-overlay');
	loadingOverlay.style.display = 'none'; // Display the overlay
}


export { startSpinner, endSpinner };
