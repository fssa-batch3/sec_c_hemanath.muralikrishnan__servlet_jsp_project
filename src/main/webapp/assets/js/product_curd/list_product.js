import { list_products } from "./appen_card.js";
import { getBaseUrlFromCurrentPage } from "../getUrl.js";
import { handleGenericError } from "../handelerrors.js";
import { endSpinner, startSpinner } from "../loading.js";

const mobile_filter = document.getElementById("mobile_filter");
const show_mobile_filter = document.querySelector(".items");

const mobile_sort_by = document.getElementById("mobile_sort_by");
const show_sort_by = document.querySelector(".sort-items");

const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";

show_mobile_filter.style.display = "none";

show_sort_by.style.display = "none";

mobile_filter.addEventListener("click", () => {
	if (show_mobile_filter.style.display === "none") {
		show_mobile_filter.style.display = "block";
	} else {
		show_mobile_filter.style.display = "none";
	}
});

mobile_sort_by.addEventListener("click", () => {
	if (show_sort_by.style.display === "none") {
		show_sort_by.style.display = "block";
	} else {
		show_sort_by.style.display = "none";
	}
});

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


const url = window.location.search; // ?name=Arun
const urlParams = new URLSearchParams(url); // converting string into key value pair
const product_cat = urlParams.get("cat");

startSpinner();

if (product_cat === "00") {
	list_products(product_details);
} else {
	const url_products = product_details.filter(
		(item) => item.category === product_cat && item.status === "AVAILABLE"
	);

	list_products(url_products);
}

endSpinner();

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

					list_products(filter_array);
				}

				return true;
			});
		});

		if (filter_array.length === 0) {
			list_products(product_details);
		}
	});
});

// sortby for desktop and mobile

const sort_opt = document.querySelectorAll('input[name="sort_by_in_cat"]');

sort_opt.forEach((item) => {
	item.addEventListener("click", (e) => {
		if (item.value === "name_a_to_z") {
			name_a_to_z();
		} else if (item.value === "name_z_to_a") {
			name_z_to_a();
		} else if (item.value === "cost_high_to_low") {
			cost_high_to_low();
		} else {
			cost_low_to_hi();
		}
	});
});

function name_a_to_z() {
	let i;

	let switching;

	let shouldSwitch;

	let product_container;

	switching = true;

	while (switching) {
		switching = false;

		product_container = document.querySelectorAll(".product-container");

		for (i = 0; i < product_container.length - 1; i++) {
			shouldSwitch = false;

			if (
				product_container[i]
					.querySelector(".product_english_name")
					.innerHTML.toLowerCase() >
				product_container[i + 1]
					.querySelector(".product_english_name")
					.innerHTML.toLowerCase()
			) {
				shouldSwitch = true;

				break;
			}
		}
		if (shouldSwitch) {
			product_container[i].parentNode.insertBefore(
				product_container[i + 1],
				product_container[i]
			);

			switching = true;
		}
	}
}

function name_z_to_a() {
	let i;

	let switching;

	let shouldSwitch;

	let product_container;

	switching = true;

	while (switching) {
		switching = false;

		product_container = document.querySelectorAll(".product-container");

		for (i = 0; i < product_container.length - 1; i++) {
			shouldSwitch = false;

			if (
				product_container[i]
					.querySelector(".product_english_name")
					.innerHTML.toLowerCase() <
				product_container[i + 1]
					.querySelector(".product_english_name")
					.innerHTML.toLowerCase()
			) {
				shouldSwitch = true;

				break;
			}
		}
		if (shouldSwitch) {
			product_container[i].parentNode.insertBefore(
				product_container[i + 1],
				product_container[i]
			);

			switching = true;
		}
	}
}

function cost_high_to_low() {
	let i;

	let switching;

	let shouldSwitch;

	let product_container;

	switching = true;

	while (switching) {
		switching = false;

		product_container = document.querySelectorAll(".product-container");

		for (i = 0; i < product_container.length - 1; i++) {
			shouldSwitch = false;

			const one_value = product_container[i]
				.querySelector(".amount")
				.innerHTML.split(" ");
			const two_value = product_container[i + 1]
				.querySelector(".amount")
				.innerHTML.split(" ");

			if (Number(one_value[1]) > Number(two_value[1])) {
				shouldSwitch = true;

				break;
			}
		}
		if (shouldSwitch) {
			product_container[i].parentNode.insertBefore(
				product_container[i + 1],
				product_container[i]
			);

			switching = true;
		}
	}
}

function cost_low_to_hi() {
	let i;

	let switching;

	let shouldSwitch;

	let product_container;

	switching = true;

	while (switching) {
		switching = false;

		product_container = document.querySelectorAll(".product-container");

		for (i = 0; i < product_container.length - 1; i++) {
			shouldSwitch = false;

			const one_value = product_container[i]
				.querySelector(".amount")
				.innerHTML.split(" ");
			const two_value = product_container[i + 1]
				.querySelector(".amount")
				.innerHTML.split(" ");

			if (Number(one_value[1]) < Number(two_value[1])) {
				shouldSwitch = true;

				break;
			}
		}
		if (shouldSwitch) {
			product_container[i].parentNode.insertBefore(
				product_container[i + 1],
				product_container[i]
			);

			switching = true;
		}
	}
}
