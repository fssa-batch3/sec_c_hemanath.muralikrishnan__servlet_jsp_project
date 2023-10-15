function startSpinner() {
	// Get a reference to the loading container
	const loadingContainer = document.getElementById("loadingContainer");
	loadingContainer.style.display = "block"; // Show the loading container
}


function endSpinner() {
	// Get a reference to the loading container
	const loadingContainer = document.getElementById("loadingContainer");
	loadingContainer.style.display = "none"; // Show the loading container
}


export { startSpinner, endSpinner };
