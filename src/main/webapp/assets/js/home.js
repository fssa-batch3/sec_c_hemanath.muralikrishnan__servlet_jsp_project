import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { handleGenericError } from "./handelerrors.js";
import { startSpinner, endSpinner } from "./loading.js";
import { list_products } from "./product_curd/appen_card.js";

const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";

const getCategoryCount = getBaseUrlFromCurrentPage() + "/GetCategoryCount";

let product_details;
const some_products = [];

let exotic_fruits = document.querySelector(".exotic_fruits");
let exotic_veggies = document.querySelector(".exotic_veggies");
let fresh_fruits = document.querySelector(".fresh_fruits");
let fresh_veggies = document.querySelector(".fresh_veggies");
let leafy_green = document.querySelector(".leafy_green");
let tubers = document.querySelector(".tubers");


try {

	startSpinner();

	const response = await axios.get(getCategoryCount);
	updateProductCounts(response.data);

} catch (error) {

	handleGenericError(error);
} finally {

	endSpinner();
}

function updateProductCounts(categoryCountMap) {

	const keys = Object.keys(categoryCountMap);
	// Now you have the keys as an array, and you can use them as needed
	exotic_fruits.innerText = `${categoryCountMap[1]} products` || "0 products";
	exotic_veggies.innerText = `${categoryCountMap[2]} products` || "0 products";
	fresh_fruits.innerText = `${categoryCountMap[3]} products` || "0 products";
	fresh_veggies.innerText = `${categoryCountMap[4]} products` || "0 products";
	leafy_green.innerText = `${categoryCountMap[5]} products` || "0 products";
	tubers.innerText = `${categoryCountMap[6]} products` || "0 products";
}

async function getRandomIndices(arr, count) {
	const indices = new Set();
	while (indices.size < count) {
		const randomIndex = Math.floor(Math.random() * arr.length);
		indices.add(randomIndex);
	}
	return Array.from(indices);
}

try {
	startSpinner();
	const response = await axios.get(readAllServlet);
	product_details = response.data;
} catch (error) {
	handleGenericError(error);
} finally {
	endSpinner();
}

startSpinner();

if (product_details.length > 0) {
	const randomIndices = await getRandomIndices(product_details, 14);

	for (const index of randomIndices) {
		if (product_details[index].status === "AVAILABLE") {
			some_products.push(product_details[index]);
		}
	}
}

endSpinner();

list_products(some_products);
