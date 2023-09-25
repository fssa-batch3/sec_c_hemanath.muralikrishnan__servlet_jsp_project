import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { handleGenericError } from "./handelerrors.js";
import { logged_email } from "./is_logged.js";
import { startSpinner, endSpinner } from "./loading.js";


const cart_number = document.getElementById("cart-count");

const mobile_cart_number = document.getElementById("mobile-cart-count");

const fullUrl = getBaseUrlFromCurrentPage() + "/CartCRUDServlet?action=getLength";

async function cart_count_fun() {

	cart_number.innerText = "";

	mobile_cart_number.innerText = "";

	if (logged_email) {

		try {
			startSpinner();
			const response = await axios.post(fullUrl);
			const count = response.data;
			cart_number.innerText = count;
			mobile_cart_number.innerText = count;

		} catch (error) {

			handleGenericError(error);
		}
		finally {
			endSpinner();
		}

	} else {
		cart_number.innerText = "0";

		mobile_cart_number.innerText = "0";

	}
}

await cart_count_fun();

export { cart_count_fun };
