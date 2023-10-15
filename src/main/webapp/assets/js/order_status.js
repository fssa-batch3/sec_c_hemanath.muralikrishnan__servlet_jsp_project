import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { logged_email } from "./is_logged.js";


if (logged_email == null) {

	window.location.href = getBaseUrlFromCurrentPage() + "/pages/error/error_page.jsp?error=401&msg= User is not authenticated, Unauthorized access."
}