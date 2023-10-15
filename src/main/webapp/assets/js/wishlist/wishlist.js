import { getBaseUrlFromCurrentPage } from "../getUrl.js";
import { handleGenericError } from "../handelerrors.js";
import { logged_email } from "../is_logged.js";
import { endSpinner, startSpinner } from "../loading.js";
import { Notify } from "../vendor/notify.js";
import { wishlist_count_fun } from "./wishlist_count.js";

// getting the element to append the div
const appen_div = document.querySelector(".wishlist-cont");
const wish_title = document.getElementById("wish-title");
const wishlistServlet = getBaseUrlFromCurrentPage() + "/WishlistCRUD";
const readAllServlet = getBaseUrlFromCurrentPage() + "/ReadAllProductServlet";

let wishlist;
let products;

async function show_the_wishlist() {

	if (logged_email) {


		try {

			startSpinner();
			const proRes = await axios.get(readAllServlet);
			products = proRes.data;
			const proWish = await axios.post(wishlistServlet + "?action=readAll");
			wishlist = proWish.data;
			wish_title.innerText = `My Wishlist(${wishlist.length})`;
			if (wishlist.length != 0) {
				wish_list(wishlist);
			} else {
				appen_div.innerHTML = `<p class="no-wishlist-pro">No favourite products found</p>`;
			}

		} catch (error) {

			handleGenericError(error);
		} finally {

			endSpinner();
		}

	} else {
		wish_title.innerText = `My Wishlist(0)`;
		appen_div.innerHTML = `<p class="no-wishlist-pro">No favourite products found</p>`;
	}

	// my title count increasing

}

await show_the_wishlist();

function wish_list(array = []) {

	appen_div.innerHTML = "";

	array.forEach(item => {


		const findPro = products.find(obj => obj.id == item.productID);

		const href_link = getBaseUrlFromCurrentPage() + `/pages/product_details/details.jsp?` +
			`id=${findPro.id}&` +
			`cat=${findPro.category}`;

		const wishlistSec = document.createElement("div");
		wishlistSec.classList.add("wishlist-sec");

		const wishlistContent = document.createElement("div");
		wishlistContent.classList.add("wishlist-content");


		const wishlistProImage = document.createElement("div");
		wishlistProImage.classList.add("wishlist-pro-image");

		const aLink = document.createElement("a");

		if (findPro.status == "AVAILABLE") {

			aLink.href = href_link;
		} else {

			aLink.href = "#";
		}



		const wishlistImg = document.createElement("img");
		wishlistImg.src = findPro.imageUrl;
		wishlistImg.alt = `image of ${findPro.name.englishName}`;

		aLink.appendChild(wishlistImg);
		wishlistProImage.appendChild(aLink);

		const wishlistText = document.createElement("div");
		wishlistText.classList.add("wishlist-text");

		const wishProTitle = document.createElement("p");
		wishProTitle.classList.add("wish-pro-title");
		wishProTitle.innerText = findPro.name.englishName;

		const wishCat = document.createElement("p");
		wishCat.classList.add("wish-cat");
		wishCat.innerText = findPro.category.replace(/_/g, ' ');

		const wishlistQuantity = document.createElement("div");
		wishlistQuantity.classList.add("wishlist-quantity");

		const quantity = document.createElement("p");
		quantity.innerHTML = `<b>Qty:</b> ${findPro.quantities[0].weight} ${findPro.quantities[0].unit}`;

		const wishPrice = document.createElement("p");
		wishPrice.classList.add("wish-price");
		wishPrice.innerText = `₹ ${findPro.quantities[0].rs}`;

		wishlistQuantity.appendChild(quantity);
		wishlistQuantity.appendChild(wishPrice);

		wishlistText.appendChild(wishProTitle);
		wishlistText.appendChild(wishCat);
		wishlistText.appendChild(wishlistQuantity);

		const iconDel = document.createElement("div");
		iconDel.classList.add("icon-del");

		const delIcon = document.createElement("i");
		delIcon.classList.add("fa-solid", "fa-trash");
		delIcon.onclick = () => deletewishlist(item.productID);

		iconDel.appendChild(delIcon);

		wishlistContent.appendChild(wishlistProImage);
		wishlistContent.appendChild(wishlistText);

		wishlistSec.appendChild(wishlistContent);

		wishlistSec.appendChild(iconDel);

		appen_div.appendChild(wishlistSec);

	});


}

async function deletewishlist(id) {

	try {

		const confirmation = window.confirm("Are you sure you want to remove the product from wishlist");

		if (confirmation) {

			startSpinner();

			const response = await axios.post(wishlistServlet + "?action=delete&productID=" + id);

			if (response.data.trim() == "success") {

				Notify.success("Product removed from wishlist");

				const proWish = await axios.post(wishlistServlet + "?action=readAll");
				wishlist = proWish.data;
				wish_title.innerText = `My Wishlist(${wishlist.length})`;
				wishlist_count_fun();
				if (wishlist.length != 0) {
					wish_list(wishlist);
				} else {
					appen_div.innerHTML = `<p class="no-wishlist-pro">No favourite products found</p>`;
				}
			}


		} else {

			Notify.error("Cancelled");
		}


	} catch (error) {


	} finally {

		endSpinner();
	}
}

