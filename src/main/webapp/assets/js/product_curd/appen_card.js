
/* The below code is importing various modules and functions from different files. It is also declaring
some variables and assigning values to them. The code is setting the URLs for two servlets,
"ReadAllProductServlet" and "CartCRUDServlet", using the root location obtained from the current
page URL. The code also declares variables "user_id" and "product_json" without assigning any values
to them. */
import { Notify } from "../vendor/notify.js";
import { cart_count_fun } from "../cart_count.js";
import { getBaseUrlFromCurrentPage } from "../getUrl.js";
import { startSpinner, endSpinner } from "../loading.js";
import { logged_email, findUserRecordByEmail } from "../is_logged.js";
import { handleGenericError } from "../handelerrors.js";

const root_loc = getBaseUrlFromCurrentPage();

const readAllServlet = root_loc + "/ReadAllProductServlet";
const cartServlet = root_loc + "/CartCRUDServlet";

let user_id;
let product_json;

/* The below code is written in JavaScript and it performs the following actions: */
try {
	startSpinner();
	if (logged_email !== null) {
		let user_profile = await findUserRecordByEmail(logged_email);
		user_id = user_profile.id;
	}
} catch (error) {
	handleGenericError(error);
} finally {
	endSpinner();
}



/* The above code is written in JavaScript and it is performing the following tasks: */
try {
	startSpinner();
	await fetchDataFromAPI();
} catch (error) {
	handleGenericError(error);
} finally {
	endSpinner();
}

/**
 * The function fetchDataFromAPI uses the axios library to make an asynchronous GET request to a
 * servlet and retrieves data from the response.
 */
async function fetchDataFromAPI() {
	try {
		const response = await axios.get(readAllServlet);
		product_json = response.data;
	} catch (error) {
		handleGenericError(error);
	}
}

/* The above code is setting an interval to execute the function `fetchDataFromAPI` every 2 minutes (2
* 60 * 1000 milliseconds). */
const intervalMilliseconds = 2 * 60 * 1000; // 2 minutes
setInterval(fetchDataFromAPI, intervalMilliseconds);


/**
 * The `list_products` function takes an array of products, creates HTML elements for each product, and
 * appends them to a container element on the page.
 * @param [array] - An array of products to be displayed. Each product object in the array should have
 * the following properties:
 * @returns The function does not explicitly return anything.
 */
function list_products(array = []) {

	startSpinner();

	const productListContainer = document.querySelector(".append_the_products");

	// Clear any existing products in the container
	productListContainer.innerHTML = "";

	if (array === null || array.length === 0) {
		// If array is null or empty, display "No products found" message
		const noProductsMessage = document.createElement("h3");
		noProductsMessage.style.textAlign = "center";
		noProductsMessage.innerText = "No products found";
		productListContainer.appendChild(noProductsMessage);
		return;
	}

	array.forEach((item, index) => {

		if (!(item.status === "AVAILABLE")) {
			return;
		}
		// product_container_div
		const product_container_div = document.createElement("div");
		product_container_div.setAttribute("class", "product-container");

		// product_main_div
		const product_main_div = document.createElement("div");
		product_main_div.setAttribute("class", "product-main");
		product_container_div.append(product_main_div);

		const product_id = item.id;
		const product_cat = item.category;
		const href_link =
			`${root_loc}/pages/product_details/details.jsp?` +
			`id=${product_id}&` +
			`cat=${product_cat}`;

		// indv product link
		const indv_product_link = document.createElement("a");
		indv_product_link.setAttribute("href", href_link);
		product_main_div.append(indv_product_link);

		// product_image_div
		const product_image_div = document.createElement("div");
		product_image_div.setAttribute("class", "product-img");
		indv_product_link.append(product_image_div);

		// product_image_creating
		const product_image_src = document.createElement("img");
		product_image_src.setAttribute("src", item.imageUrl);
		product_image_src.setAttribute("alt", item.name.englishName);
		product_image_div.append(product_image_src);

		// product category title
		const product_cat_title = document.createElement("p");
		product_cat_title.setAttribute("class", "category-title");
		product_cat_title.innerHTML = item.category.replace(/_/g, ' ');
		indv_product_link.append(product_cat_title);

		// product_name_div
		const product_name_div = document.createElement("div");
		product_name_div.setAttribute("class", "product-name");
		indv_product_link.append(product_name_div);

		// product_names

		// product eng name
		const product_eng_name_p = document.createElement("p");
		product_eng_name_p.setAttribute("class", "product_english_name");
		product_eng_name_p.innerText = item.name.englishName;
		product_name_div.append(product_eng_name_p);

		// product tam name
		const product_tam_name_p = document.createElement("p");
		product_tam_name_p.innerText = item.name.tamilName;
		product_name_div.append(product_tam_name_p);

		const select_tag = document.createElement("select");
		select_tag.setAttribute("class", "amount_dropdown");
		select_tag.setAttribute("data-product-id", product_id);
		product_main_div.append(select_tag);

		const list_qty = item.quantities;

		list_qty.forEach((data) => {
			const option_tag = document.createElement("option");
			option_tag.setAttribute("data-product-qty", data.id);
			option_tag.setAttribute("data-product-weight", data.weight);
			option_tag.setAttribute("data-product-unit", data.unit);
			option_tag.setAttribute("value", data.rs);
			option_tag.innerHTML = `${data.weight}${data.unit} - &#x20B9;${data.rs}`;
			select_tag.appendChild(option_tag);
		});

		// amount
		const amount = document.createElement("div");
		amount.className = "amount";
		amount.innerText = `Rs. ${item.quantities[0].rs}`;
		product_main_div.append(amount);

		select_tag.addEventListener("change", (e) => {
			const selectvalue = select_tag.value;
			amount.innerText = `Rs. ${selectvalue}`;
		});

		let qty_value = 1;

		let qty_plus_value;

		let qty_minus_value;

		// quantity cart div
		const quantity_cart_div = document.createElement("div");
		quantity_cart_div.setAttribute("class", "qty-cat");
		product_main_div.append(quantity_cart_div);

		const qty_div = document.createElement("div");
		qty_div.setAttribute("class", "qty");
		quantity_cart_div.append(qty_div);

		const qty_minus = document.createElement("div");
		qty_minus.innerHTML = `<img src="https://freeimghost.net/images/2023/09/13/minus-sign.png" alt="minus-sing">`;
		qty_minus.className = "qty-minus";
		qty_div.append(qty_minus);

		const qty_number = document.createElement("div");
		qty_number.innerText = "1";
		qty_number.className = "qty-number";
		qty_div.append(qty_number);

		const qty_plus = document.createElement("div");
		qty_plus.innerHTML = `<img src="https://freeimghost.net/images/2023/09/13/add.png" alt="add-sign">`;
		qty_plus.className = "qty-plus";
		qty_div.append(qty_plus);

		// add button div

		const add_to_cart = document.createElement("div");
		add_to_cart.setAttribute("class", "fa-solid fa-cart-plus list_cart");
		quantity_cart_div.append(add_to_cart);

		qty_plus.addEventListener("click", () => {
			const elem = document.querySelectorAll(".list_cart");
			qty_value++;
			qty_plus_value = qty_value;
			qty_number.innerText = qty_plus_value;

			updatequantity(
				product_id,
				qty_number.innerText,
				elem,
				index
			);
		});

		qty_minus.addEventListener("click", () => {
			if (qty_value > 1) {
				const elem = document.querySelectorAll(".list_cart");
				qty_value--;
				qty_minus_value = qty_value;
				qty_number.innerText = qty_minus_value;

				updatequantity(
					product_id,
					qty_number.innerText,
					elem,
					index
				);
			}
		});

		add_to_cart.addEventListener("click", () => {
			// pass the parameters to the add to cart functionality

			get_cart_ele(
				product_id,
				qty_number.innerText
			);
		});

		productListContainer.append(product_container_div);
	});

	endSpinner();
}

/**
 * The function updates the quantity of a product based on the selected option in a dropdown menu.
 * @param id - The id parameter is the unique identifier of the product. It is used to find the
 * <select> element with the specific data-product-id attribute.
 * @param qty - The `qty` parameter represents the quantity of the product that needs to be updated.
 * @param elem - The `elem` parameter is a reference to the HTML element that triggered the
 * updatequantity function. It is used to perform specific actions on that element, such as updating
 * its content or styling.
 * @param index - The parameter "index" is used to specify the index of the element in an array or
 * list. It is typically used when you want to perform an operation on a specific element at a
 * particular index.
 */
function updatequantity(id, qty, elem, index) {
	// Find the <select> element with the specific data-product-id
	const productSelect = document.querySelector(`select[data-product-id="${id}"]`);

	if (productSelect) {
		// Get the selected option element within the <select>
		const selectedOption = productSelect.options[productSelect.selectedIndex];

		if (selectedOption) {
			// Get the value of the selected data-product-qty attribute
			const selectedQty = selectedOption.getAttribute("data-product-qty");

			doOther(id, qty, elem, index, selectedQty);

		} else {
			Notify.error("No option selected.");
		}
	} else {
		Notify.error(`No <select> element found with data-product-id: ${id}`);
	}
}

/**
 * The function "findObj" searches for an object in an array called "product_json" based on its id.
 * @param id - The `id` parameter is the unique identifier of the object that we want to find in the
 * `product_json` array.
 * @returns an object from the `product_json` array that has a matching `id` property value.
 */
function findObj(id) {
	return product_json.find((obj) => {
		return obj.id == id;
	});
}

/**
 * The function `doOther` checks the availability of a product and performs different checks based on
 * the unit of measurement.
 * @param id - The id parameter is used to identify the product. It is passed to the findObj function
 * to find the product object.
 * @param qty - The quantity of the product being checked.
 * @param elem - The `elem` parameter is a reference to the HTML element that triggered the function.
 * It is used to manipulate the element or its properties within the function.
 * @param index - The index parameter is used to specify the index of the element in an array or list.
 * It is typically used to access or manipulate a specific element at that index.
 * @param qty_id - The ID of the quantity object that needs to be checked.
 */
function doOther(id, qty, elem, index, qty_id) {

	let findProduct = findObj(id);

	if (findProduct && findProduct.status === "AVAILABLE") {

		findProduct.quantities.find((obj) => {
			if (qty_id == obj.id) {

				if (obj.unit === "KG") {
					checkwithkg(JSON.stringify(findProduct), qty, elem, index, qty_id);
				} else if (obj.unit === "GM") {
					checkwithgm(JSON.stringify(findProduct), qty, elem, index, qty_id);
				} else {
					checkwithbase(JSON.stringify(findProduct), qty, elem, index, qty_id);
				}
			}

		});

	} else {

		Notify.error("Cannot find product");
	}

}




/**
 * The function "checkwithkg" checks if a required quantity of a product is available based on the
 * available stock and weight of the product.
 * @param product - The `product` parameter is a JSON string representing a product object. It contains
 * information about the product, including its available stock and quantities.
 * @param qty - The quantity of the product that needs to be checked.
 * @param elem - `elem` is an array of DOM elements.
 * @param index - The index parameter is used to specify the index of the element in the elem array
 * that needs to be checked or modified.
 * @param qty_id - The `qty_id` parameter is the ID of the quantity that needs to be checked against
 * the available stock.
 */
function checkwithkg(product, qty, elem, index, qty_id) {
	const par = JSON.parse(product);

	par.quantities.find((obj) => {
		if (qty_id == obj.id) {


			const avl_into_gram = par.availableStock.num * 1000;

			const qty_into_gram = obj.weight * 1000;

			const check = qty * qty_into_gram;

			if (Number(check) > Number(avl_into_gram)) {
				elem[index].classList.add("disabled");

				Notify.error("Required quantity not available");
			} else {
				elem[index].classList.remove("disabled");
			}
			return true;
		}
		return false;
	});
}

// check with gm
/**
 * The function checks if a required quantity of a product is available based on the available stock
 * and weight of the product.
 * @param product - The `product` parameter is a JSON string representing a product object. It contains
 * information about the product, including its available stock and quantities.
 * @param qty - The `qty` parameter represents the quantity of a product that needs to be checked
 * against the available stock.
 * @param elem - `elem` is an array of DOM elements.
 * @param index - The index parameter is used to specify the index of the element in the elem array
 * that needs to be checked or modified.
 * @param qty_id - The `qty_id` parameter is the ID of the quantity that needs to be checked against
 * the available stock.
 */
function checkwithgm(product, qty, elem, index, qty_id) {
	const par = JSON.parse(product);

	par.quantities.find((obj) => {
		if (qty_id == obj.id) {

			const avl_into_gram = par.availableStock.num * 1000;
			const check = qty * obj.weight;

			if (Number(check) > Number(avl_into_gram)) {
				elem[index].classList.add("disabled");

				Notify.error("Required quantity not available");
			} else {
				elem[index].classList.remove("disabled");
			}
			return true;
		}
		return false;
	});
}

// check with base

/**
 * The function `checkwithbase` checks if a given quantity of a product is available in stock and
 * updates the class of an element accordingly.
 * @param product - The `product` parameter is a JSON string representing a product object. It contains
 * information about the product, including its available stock and quantities.
 * @param qty - The `qty` parameter represents the quantity of a product.
 * @param elem - `elem` is an array of DOM elements.
 * @param index - The `index` parameter is the index of the element in the `elem` array that needs to
 * be checked or modified.
 * @param qty_id - The `qty_id` parameter is the ID of the quantity that needs to be checked against
 * the available stock.
 */
function checkwithbase(product, qty, elem, index, qty_id) {
	const par = JSON.parse(product);

	par.quantities.find((obj) => {
		if (qty_id == obj.id) {
			const check = qty * obj.weight;
			if (Number(check) > Number(par.availableStock.num)) {
				elem[index].classList.add("disabled");

				Notify.error("Required quantity not available");
			} else {
				elem[index].classList.remove("disabled");
			}
			return true;
		}

		return false;
	});
}


/**
 * The function "checkAdd" checks if the variable "user_id" is defined and returns true if it is,
 * otherwise it returns false.
 * @returns a boolean value. If the variable "user_id" is defined, it will return true. Otherwise, it
 * will return false.
 */
function checkAdd() {

	if (user_id != undefined) {

		return true;
	} else {

		return false;
	}

}

/**
 * The function `get_cart_ele` is an asynchronous function that adds a product to the cart based on the
 * selected quantity and product options.
 * @param id - The id parameter is the unique identifier of the product that you want to add to the
 * cart.
 * @param no_qty - The quantity of the product to be added to the cart.
 * @returns nothing if the product is not found or if the user is not logged in. If the product is
 * found and the user is logged in, the function either returns an error message if the item is already
 * in the cart or if the quantity exceeds the available stock, or it adds the product to the cart and
 * updates the cart count.
 */
async function get_cart_ele(id, no_qty) {

	let productObj = findObj(id);

	if (!(productObj && productObj.status === "AVAILABLE")) {
		Notify.error("product not found");
		return;
	}

	if (checkAdd()) {

		const productSelect = document.querySelector(`select[data-product-id="${id}"]`);

		if (productSelect) {
			// Get the selected option element within the <select>
			const selectedOption = productSelect.options[productSelect.selectedIndex];

			if (selectedOption) {
				// Get the value of the selected data-product-qty attribute
				const selectedQty = selectedOption.getAttribute("data-product-qty");
				const selectedWeight = selectedOption.getAttribute("data-product-weight");
				const selectedUnit = selectedOption.getAttribute("data-product-unit");

				const waitForCheck = await check_qty(id, selectedQty);

				if (waitForCheck) {

					Notify.error(
						`Item already added to cart ${productObj.name.englishName} ${selectedWeight}${selectedUnit}`
					);

				} else {

					if (!(no_qty <= 0)) {

						const avl_into_gram = productObj.availableStock.num * (selectedUnit == "KG" || selectedUnit == "GM" ? 1000 : 1);
						const check = no_qty * (selectedUnit == "KG" ? selectedWeight * 1000 : selectedWeight);

						if (!(check <= avl_into_gram)) {

							Notify.error("Cannot add product to the cart more than available stock.");
						} else {
							add_product_to_cart(id, selectedQty, no_qty, productObj.seller.id);
							cart_count_fun();
						}

					} else {

						Notify.error("Invalid quantity.");
					}

				}

			} else {
				Notify.error("No option selected.");
			}
		} else {
			Notify.error(`No <select> element found with data-product-id: ${id}`);
		}


	} else {

		Notify.error("Please Login to add products to cart.");
	}

}


/**
 * The function `add_product_to_cart` adds a product to the user's cart with the specified details.
 * @param id - The id parameter represents the product id of the item being added to the cart.
 * @param selectedQty - The selected quantity of the product to be added to the cart.
 * @param no_qty - The parameter `no_qty` represents the quantity of the product that the user wants to
 * add to the cart.
 * @param seller - The `seller` parameter is the ID of the seller from whom the product is being
 * purchased.
 */
async function add_product_to_cart(id, selectedQty, no_qty, seller) {


	const currentTimestamp = Date.now();
	const seconds = Math.floor(currentTimestamp / 1000); // Convert milliseconds to seconds

	const cart_item_id = `${user_id}_${currentTimestamp}_${seconds}`;

	const cart_obj = {
		seller_id: seller,
		cart_item_id: cart_item_id,
		product_id: id,
		qty_id: selectedQty,
		quantity: no_qty,
		product_added_date: new Date().toLocaleDateString(),
		product_added_time: new Date().toLocaleTimeString(),
		ready_for_checkout: true
	};

	const item_string = JSON.stringify(cart_obj);

	try {
		startSpinner();

		const params = new URLSearchParams({ action: "add", item: item_string });

		const fullUrl = `${cartServlet}?${params.toString()}`;

		const response = await axios.post(fullUrl);

		if (response.data.trim() === "success") {

			Notify.success("Product successfully added to cart");
		} else {

			Notify.error("Failed to add product to cart.");
		}


	} catch (error) {

		handleGenericError(error);


	} finally {
		endSpinner();
	}

}

// check in the cart the selected the cart qty already added

/**
 * The function `check_qty` checks if a specific item with a given ID and quantity ID exists in the
 * cart.
 * @param id - The `id` parameter represents the product ID that you want to check in the cart items.
 * @param qty_id - The `qty_id` parameter is the identifier for the quantity of a product in the cart.
 * It is used to find a specific item in the cart based on its product ID and quantity ID.
 * @returns the foundItem, which is an object from the cartItems array that matches the given id and
 * qty_id.
 */
async function check_qty(id, qty_id) {
	let cartItems;

	try {
		startSpinner();
		cartItems = await get_all_cart_products();
	} catch (error) {
		handleGenericError(error);
	} finally {
		endSpinner();
	}

	const foundItem = cartItems.find((obj) => {
		return id === obj.product_id && qty_id === obj.qty_id;
	});

	return foundItem;
}

/**
 * The function `get_all_cart_products` makes an asynchronous POST request to a servlet to retrieve all
 * cart products and returns the response data.
 * @returns the data received from the server in the response object.
 */
async function get_all_cart_products() {
	try {
		const response = await axios.post(cartServlet + "?action=readAll");
		return response.data;
	} catch (error) {
		throw error;
	}
}

/* The above code is exporting three functions: `list_products`, `get_cart_ele`, and `updatequantity`.
These functions can be imported and used in other JavaScript files. */
export { list_products, get_cart_ele, updatequantity };
