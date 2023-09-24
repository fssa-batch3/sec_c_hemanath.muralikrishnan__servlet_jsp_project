import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { handleGenericError } from "./handelerrors.js";
import { startSpinner, endSpinner } from "./loading.js";
import { list_products } from "./product_curd/appen_card.js";



const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";

let product_details;
const some_products = [];

// some products should present in the index page

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

if (product_details.length != 0) {
	for (let i = 0; i < 14; i++) {
		if (product_details[i].status === "AVAILABLE") {
			some_products.push(product_details[i]);
		}
	}
}

endSpinner();

list_products(some_products);
