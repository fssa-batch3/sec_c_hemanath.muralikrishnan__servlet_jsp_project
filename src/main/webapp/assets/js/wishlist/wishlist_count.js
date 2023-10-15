import { getBaseUrlFromCurrentPage } from "../getUrl.js";
import { handleGenericError } from "../handelerrors.js";
import { logged_email } from "../is_logged.js";
import { startSpinner, endSpinner } from "../loading.js";


getBaseUrlFromCurrentPage

const wishlist_element = document.getElementById("wishlist-count");
const mobile_wishlist_elemetn = document.getElementById(
	"mobile-wishlist-count"
);

const fullUrl = getBaseUrlFromCurrentPage() + "/WishlistCRUD?action=getLength";

async function wishlist_count_fun() {

	wishlist_element.innerText = "";

	mobile_wishlist_elemetn.innerText = "";

	if (logged_email) {

		try {
			startSpinner();
			const response = await axios.post(fullUrl);
			const count = response.data;
			wishlist_element.innerText = count;
			mobile_wishlist_elemetn.innerText = count;

		} catch (error) {

			handleGenericError(error);
		}
		finally {
			endSpinner();
		}


	} else {

		wishlist_element.innerText = "0";

		mobile_wishlist_elemetn.innerText = "0";

	}
}


await wishlist_count_fun();

export { wishlist_count_fun };
