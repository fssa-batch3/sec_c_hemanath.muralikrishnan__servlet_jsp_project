/* The code is importing various functions and variables from different JavaScript files. */
import { list_products } from "./appen_card.js";
import { getBaseUrlFromCurrentPage } from "../getUrl.js";
import { handleGenericError } from "../handelerrors.js";
import { endSpinner, startSpinner } from "../loading.js";

const mobile_filter = document.getElementById("mobile_filter");
const show_mobile_filter = document.querySelector(".items");

const mobile_sort_by = document.getElementById("mobile_sort_by");
const show_sort_by = document.querySelector(".sort-items");

const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";

const productsPerPage = 8; // Change this value as needed



/**
 * The function toggles the display property of an element between "none" and "block".
 * @param element - The parameter "element" is the HTML element that you want to toggle the display of.
 */
function toggleElementDisplay(element) {
	if (element.style.display === "none") {
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
}

/* This code is responsible for toggling the display of two elements, `show_mobile_filter` and
`show_sort_by`, based on user interaction. */
show_mobile_filter.style.display = "none";
show_sort_by.style.display = "none";

mobile_filter.addEventListener("click", (event) => {
	event.stopPropagation();
	toggleElementDisplay(show_mobile_filter);
});

mobile_sort_by.addEventListener("click", (event) => {
	event.stopPropagation();
	toggleElementDisplay(show_sort_by);
});

window.addEventListener("click", (event) => {
	if (show_mobile_filter.style.display === "block" && event.target !== mobile_filter) {
		show_mobile_filter.style.display = "none";
	}

	if (show_sort_by.style.display === "block" && event.target !== mobile_sort_by) {
		show_sort_by.style.display = "none";
	}
});


/* This code is making an asynchronous HTTP GET request to the `readAllServlet` endpoint and retrieving
the response data. The response data is then assigned to the `product_details` variable. */
let product_details;

try {
	startSpinner();
	const response = await axios.get(readAllServlet);
	product_details = response.data;
} catch (error) {

	handleGenericError(error);
} finally {
	endSpinner();

}

/* This code is retrieving the value of the "cat" parameter from the URL query string. It then checks
if the value of "cat" is equal to "00". If it is, it calls the `list_products` function with the
`product_details` array as the argument. If the value of "cat" is not equal to "00", it filters the
`product_details` array based on the condition that the item's category is equal to the value of
"cat" and its status is "AVAILABLE". The filtered array is then passed as an argument to the
`list_products` function. Finally, the `startSpinner` and `endSpinner` functions are called to show
and hide a loading spinner, respectively. */

const url = window.location.search; // ?name=Arun
const urlParams = new URLSearchParams(url); // converting string into key value pair
const product_cat = urlParams.get("cat");

startSpinner();

if (product_cat === "00") {
	displayPagination(product_details, 12);
} else {
	const url_products = product_details.filter(
		(item) => item.category === product_cat && item.status === "AVAILABLE"
	);

	displayPagination(url_products, productsPerPage);
}

endSpinner();

/* The code is adding event listeners to a group of checkboxes with the name "filter_cat". When any of
the checkboxes are clicked, the code performs the following actions: */
let filter_array = [];

let enable_setting = [];

const checkboxes = document.querySelectorAll(
	"input[type=checkbox][name=filter_cat]"
);

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("click", () => {
		filter_array = [];

		enable_setting = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
			.filter((i) => i.checked) // Use Array.filter to remove unchecked checkboxes.
			.map((i) => i.value);

		enable_setting.forEach((item) => {
			product_details.filter((obj) => {
				const cat_name = obj.category;

				if (item === cat_name) {
					filter_array.push(obj);

					displayPagination(filter_array, productsPerPage);
				}

				return true;
			});
		});

		if (filter_array.length === 0) {
			displayPagination(product_details, productsPerPage)
		} else {
			displayPagination(filter_array, productsPerPage); // Call the pagination function
		}
	});
});

function displayPagination(filteredProducts, productsPerPage) {
	const paginationContainer = document.querySelector(".pagination");
	paginationContainer.innerHTML = ""; // Clear previous buttons

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	for (let page = 1; page <= totalPages; page++) {
		const button = document.createElement("button");
		button.innerText = page;
		button.addEventListener("click", () => {
			const start = (page - 1) * productsPerPage;
			const end = start + productsPerPage;
			const pageProducts = filteredProducts.slice(start, end);
			list_products(pageProducts);

			// Remove active class from all buttons
			const allButtons = paginationContainer.querySelectorAll("button");
			allButtons.forEach((btn) => btn.classList.remove("active-button"));

			// Add active class to the clicked button
			button.classList.add("active-button");
		});

		paginationContainer.appendChild(button);

		// Add the active class to the first button by default
		if (page === 1) {
			button.classList.add("active-button");
		}
	}


	// Display the first page of all products by default
	const start = 0;
	const end = productsPerPage;
	const pageProducts = filteredProducts.slice(start, end);
	list_products(pageProducts);

}


// sortby for desktop and mobile

/* The code is selecting all the input elements with the name "sort_by_in_cat" and assigning them to
the constant variable `sort_opt`. */
const sort_opt = document.querySelectorAll('input[name="sort_by_in_cat"]');


sort_opt.forEach((item) => {
	item.addEventListener("click", (e) => {
		const productContainers = Array.from(document.querySelectorAll(".product-container"));
		if (item.value === "name_a_to_z") {
			sortProductContainers(productContainers, "product_english_name", "asc");
		} else if (item.value === "name_z_to_a") {
			sortProductContainers(productContainers, "product_english_name", "desc");
		} else if (item.value === "cost_high_to_low") {
			sortProductContainers(productContainers, "amount", "asc");
		} else {
			sortProductContainers(productContainers, "amount", "desc");
		}
	});
});


function quickSort(arr, low, high, className, sortOrder) {
	if (low < high) {
		const pivotIndex = partition(arr, low, high, className, sortOrder);
		quickSort(arr, low, pivotIndex - 1, className, sortOrder);
		quickSort(arr, pivotIndex + 1, high, className, sortOrder);
	}
}

function partition(arr, low, high, className, sortOrder) {
	const pivot = arr[Math.floor((low + high) / 2)].querySelector(`.${className}`).innerHTML.toLowerCase();
	let i = low;
	let j = high;

	while (i <= j) {
		while ((sortOrder === 'asc' && arr[i].querySelector(`.${className}`).innerHTML.toLowerCase() < pivot) || (sortOrder === 'desc' && arr[i].querySelector(`.${className}`).innerHTML.toLowerCase() > pivot)) {
			i++;
		}
		while ((sortOrder === 'asc' && arr[j].querySelector(`.${className}`).innerHTML.toLowerCase() > pivot) || (sortOrder === 'desc' && arr[j].querySelector(`.${className}`).innerHTML.toLowerCase() < pivot)) {
			j--;
		}
		if (i <= j) {
			[arr[i], arr[j]] = [arr[j], arr[i]];
			i++;
			j--;
		}
	}

	return i;
}


function sortProductContainers(productContainers, className, sortOrder) {
	quickSort(productContainers, 0, productContainers.length - 1, className, sortOrder);
	const containerParent = productContainers[0].parentNode;
	productContainers.forEach((container) => {
		containerParent.appendChild(container);
	});
}
