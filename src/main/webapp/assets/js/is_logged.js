import { Notify } from "./vendor/notify.js";
import { getBaseUrlFromCurrentPage } from "./getUrl.js";
import { startSpinner, endSpinner } from "./loading.js";
import { handleGenericError } from "./handelerrors.js";


const root = getBaseUrlFromCurrentPage();
const UserServlet = root + "/UserServlet";
const readAllServlet = root + "/ReadAllProductServlet";

let logged_email;
let products_db;
let user_id;


try {
	startSpinner();
	logged_email = await getCurrentUser(); // Wait for getCurrentUser to complete
} catch (error) {
	handleGenericError(error);
} finally {
	endSpinner();
}

try {
	startSpinner();
	const response = await axios.get(readAllServlet);
	products_db = response.data;
} catch (error) {
	handleGenericError(error);
} finally {
	endSpinner();
}

// an asynchronous function to get the current user
async function getCurrentUser() {
	const params = new URLSearchParams({ action: "getSession" });
	const fullUrl = `${UserServlet}?${params.toString()}`;
	try {
		const response = await axios.post(fullUrl);
		return response.data?.trim() || null;
	} catch (error) {
		throw error;
	}
}

// an asynchronous function to find the user record by email ID
async function findUserRecordByEmail(email) {
	const params = new URLSearchParams({ action: "findUserByEmail", email });
	const fullUrl = `${UserServlet}?${params.toString()}`;
	try {
		const response = await axios.post(fullUrl);
		return response.data;
	} catch (error) {
		throw error; // Rethrow the error to be caught by the outer catch block
	}
}

// contians the html code for header
function appendHeader() {

	const header = `

<nav class="nav-two nav-flex" aria-label="nav-two">

<div class="logo">

    <a href="${root}/index.jsp">Agrokart</a>
    <a href="${root}/pages/company/about_us.jsp" class="company_pages">About Us</a>
    <a href="${root}/pages/company/contact_us.jsp" class="company_pages">Contact Us</a>
</div>


<div class="assistant">

    <i class="fa-solid fa-headset headphone"></i>
    <a href="tel:+91 7867979731">+91 7867979731</a>
</div>



</nav>


<nav class="nav-three nav-flex" aria-label="nav-three">

<div class="main-menu">

    <ul class="main-ul">

        <li class="list-one"><a href="#"><i class="fa-solid fa-border-all"></i> Browse All Categories <i
                    class="fa-solid fa-caret-down"></i></a>

            <div class="dropdown_menu">

                <ul>
                    <li><a href="${root}/pages/product_list/list_product.jsp?cat=EXOTIC_FRUITS">Exotic Fruits</a></li>
                    <li><a href="${root}/pages/product_list/list_product.jsp?cat=EXOTIC_VEGGIES">Exotic Veggies</a></li>
                    <li><a href="${root}/pages/product_list/list_product.jsp?cat=FRESH_VEGGIES">Fresh Veggies</a></li>
                    <li><a href="${root}/pages/product_list/list_product.jsp?cat=FRESH_FRUITS">Fresh Fruits</a></li>
                    <li><a href="${root}/pages/product_list/list_product.jsp?cat=LEAFY_GREEN">Leafy Green</a></li>
                    <li><a href="${root}/pages/product_list/list_product.jsp?cat=TUBERS">Tubers</a></li>

                </ul>

            </div>

        </li>
        <li class="home"><a href="${root}/index.jsp">Home</a></li>
        <li class="products"><a href="${root}/pages/product_list/list_product.jsp?cat=00">Products</a></li>
    </ul>

</div>

<div class="search">

    <input type="search" placeholder="search product by name" id="header_search">

    <div class="search_results_append">

    
    </div>

</div>


<div class="option-one">
    <a href="${root}/pages/profile.jsp" id="my-profile"><i class="fa-solid fa-user"></i>My Account</a>
</div>

    <div class="option-one">

        <a href="${root}/pages/wishlist.jsp"><i class="fa-regular fa-heart"></i>
            Wishlist <span class="wishlist-notify" id="wishlist-count"></span></a>

    </div>

    <div class="option-two">

        <a href="${root}/pages/cart.jsp"><i class="fa-solid fa-cart-shopping"></i>
            Cart <span class="cart-notify" id="cart-count"></span></a>

    </div>

    <div class="login">
        <p id="login-btn"><i class="fa-solid fa-right-to-bracket"></i>
            Login</p>
    </div>



</nav>


<nav class="mobile-nav" aria-label="mobile-nav">

        <div class="mobile-burger-menu">

           <label for="side-menu" class="mobile-open">&#9776;</label>

            <div class="side-menu-mobile">

                <div class="mobile-search">

                    <input type="search" placeholder="search by product name" id="mobile_search">
                   
                    <div class="mobile_search_result_append">

                    </div>
                    
                </div>

                <a href="${root}/index.jsp"><p>Home</p></a>

                <div class="side-menu-items">

                    <div class="side-products side-item">
                        <i class="fa-solid fa-list"></i>
                        <a href="${root}/pages/product_list/list_product.jsp?cat=00">Products</a>
                    </div>

                    <div class="side-auth side-item" id="mobile-profile">
                        <i class="fa-solid fa-user"></i>
                        <a href="${root}/pages/profile.jsp">My Account</a>
                    </div>

                    <div class="side-ass side-item">
                        <i class="fa-solid fa-headset headphone"></i>
                        <a href="tel:+91 1234567890">+91 7867979731</a>
                    </div>

                </div>


            </div>
        </div>

        <div class="mobile-logo">
            <a href="${root}/index.jsp" aria-label="mobile-nav">Agrokart</a>
        </div>

        <div class="mobile-menu">
            <a href="${root}/pages/wishlist.jsp"><i class="fa-regular fa-heart"></i>
            <span class="mobile-wishlist-notify" id="mobile-wishlist-count"></span>
            </a>
            <a href="${root}/pages/cart.jsp"><i class="fa-solid fa-cart-shopping"></i>
            <span class="mobile-cart-notify" id="mobile-cart-count"></span>
            </a>

            <i id="mobile-login-btn" class="fa-solid fa-arrow-right-to-bracket"></i>

        </div>

    </nav>

<div class="one-form">


<div class="login-main">

    <div class="login-form">

    <span class="login-close" id="login_close"><i class="fa-solid fa-square-xmark"></i></span>

        <form action="#" method="" id="loginform">

            <p class="act">Log in</p>

            <div class="input-wrapper">
                <input type="email" id="email-id" class="form-control" placeholder="Enter Your Email" required="true" title="Please Enter Valid Email Id without spaces">
                <label for="email-id" class="control-label">Email id</label>
              </div>

              <div class="input-wrapper">
                <i class="fa fa-eye showpwd" id="login-password"></i>
                <input type="password" id="password" autocomplete="password" class="form-control" placeholder="Enter Your Password" required="true"  minlength="8" maxlength="16" title="Password must contains at least one lowercase, one uppercase, one lowercase and one special, password length minimum 8 characters">
                <label for="password" class="control-label">Password</label>
              </div>

            <a href="#" class="forgot-pass">Forgot Password?</a>

            <button type="submit">Continue</button>

            <p class="dont-have">Don't have an account?</p>
            <p class="register-here">Create Account</p>
        </form>

    </div>
   
</div>

</div>

<div class="two-form">

<div class="register-main">

<div class="register-bond">

<span class="register-close" id="register_close"><i class="fa-solid fa-square-xmark"></i></span>


    <form id="form">

        <h1>Sign Up</h1>

        <div class="input-wrapper">
            <input type="text" id="first-name" class="form-control" placeholder="Enter your first name" required="true" pattern="^[A-Za-z]+$" title="Please enter valid first name without number, special character and white spaces" minlenght="3" maxlength="20">
            <label for="first-name" class="control-label">Firstname</label>
          </div>

          <div class="input-wrapper">
            <input type="text" id="last-name" class="form-control" placeholder="Enter your last name" required="true" pattern="^[A-Za-z]+$" title="Please enter valid last name without number, special character and white spaces" minlenght="1" maxlength="20">
            <label for="last-name" class="control-label">Lastname</label>
          </div>

          <div class="input-wrapper">
            <input type="email" id="reg-email-id" class="form-control" placeholder="Enter Your Email"  required="true" title="Please enter valid email id without white spaces">
            <label for="email-id" class="control-label">Email id</label>
          </div>

          <div class="input-wrapper">
            <input type="tel" id="mobile-number" class="form-control" placeholder="Enter Your Mobile Number" required="true" pattern="^[6-9][0-9]{9}$" minlength="10" maxlength="10" title="Please enter valid mobile number without alphabets, special characters and white spaces">
            <label for="mobile-number" class="control-label">Mobile Number</label>
          </div>

          <div class="input-wrapper">
            <i class="fa fa-eye showpwd" id="reg-password-eye"></i>
            <input type="password" id="reg-password" autocomplete="reg-password" class="form-control" placeholder="Enter Your Password" required="true"  minlength="8" maxlength="16" title="Password must contains at least one lowercase, one uppercase, one lowercase and one special, password length minimum 8 characters">
            <label for="password" class="control-label">Password</label>
          </div>
          

          <div class="input-wrapper">
            <i class="fa fa-eye showpwd" id="reg-confirm-password"></i>
            <input type="password" id="conf-password" autocomplete="conf-password" class="form-control" placeholder="Enter Your Confirm password" required="true"  minlength="8" maxlength="16" title="Password must contains at least one lowercase, one uppercase, one lowercase and one special, password length minimum 8 characters">
            <label for="conf-password" class="control-label">Confirm Password</label>
          </div>

        <button type="submit">Sign Up</button>

        <p class="register-already">Already have an account?</p>
        <p class="register-login">Log in</p>
    </form>

    </div>


</div>


</div>

`;

	return header;
}

// contians the html code for footer
function appendFooter() {

	const footer = `<footer>

	<!-- footer one start -->
	
	<div class="footer-one footer-flex">
	
		<div class="footer-logo">
	
			<p><a href="${root}/index.jsp">AgroKart</a></p>
	
		</div>
	
		<div class="company footer-flex-two">
	
			<p class="footer-title">Company</p>
			<p class="footer-one-items"><a href="${root}/pages/company/about_us.jsp" class="footer-item">About Us</a></p>
			<p class="footer-one-items"><a href="${root}/pages/company/contact_us.jsp" class="footer-item">Contact US</a></p>
		</div>
	
		<div class="account footer-flex-two">
	
			<p class="footer-title">Account</p>
			<p class="footer-one-items" id="login-btn-foot">Sign in</p>
			<p class="footer-one-items"><a href="${root}/pages/cart.jsp" class="footer-item">View Cart</a></p>
			<p class="footer-one-items"><a href="${root}/pages/wishlist.jsp" class="footer-item">My Wishlist</a></p>
	
		</div>
	
		<div class="deliver footer-flex-two">
	
			<p class="footer-title">Cities we Deliver to</p>
			<p class="footer-item footer-one-items">Chennai</p>
	
		</div>
	
	
	</div>
	<!-- footer one ends -->
	
	<!-- footer two starts -->
	
	<div class="footer-two">
	
		<div class="footer-two-left">
	
			<div class="footer-contact">
	
				<i class="fa-solid fa-location-dot"></i>
				<p><b> Address:</b> <a href="https://goo.gl/maps/bYL8xG6sQ8hjbHZA6">Chennai, Tamil Nadu</a></p>
	
			</div>
	
			<div class="footer-contact">
	
				<i class="fa-solid fa-phone"></i>
				<p> <b>Call Us:</b> <a href="tel:+91 7867979731">+91 7867979731</a></p>
	
			</div>
	
			<div class="footer-contact">
	
				<i class="fa-solid fa-envelope"></i>
				<p> <b>Email:</b> <a href="mailto:john@example.com">example@gmail.com</a></p>
	
			</div>
	
		</div>
	
		<div class="footer-right">
	
			<p>Secured Payment Gateways</p>
	
			<div class="payment">
	
				<svg fill="#072654" height="120" viewBox=".8 .48 1894.74 400.27" width="120" xmlns="http://www.w3.org/2000/svg"><path d="m122.63 105.7-15.75 57.97 90.15-58.3-58.96 219.98 59.88.05 87.1-324.92" fill="#3395ff"/><path d="m25.6 232.92-24.8 92.48h122.73l50.22-188.13zm426.32-81.42c-3 11.15-8.78 19.34-17.4 24.57-8.6 5.22-20.67 7.84-36.25 7.84h-49.5l17.38-64.8h49.5c15.56 0 26.25 2.6 32.05 7.9s7.2 13.4 4.22 24.6m51.25-1.4c6.3-23.4 3.7-41.4-7.82-54-11.5-12.5-31.68-18.8-60.48-18.8h-110.47l-66.5 248.1h53.67l26.8-100h35.2c7.9 0 14.12 1.3 18.66 3.8 4.55 2.6 7.22 7.1 8.04 13.6l9.58 82.6h57.5l-9.32-77c-1.9-17.2-9.77-27.3-23.6-30.3 17.63-5.1 32.4-13.6 44.3-25.4a92.6 92.6 0 0 0 24.44-42.5m130.46 86.4c-4.5 16.8-11.4 29.5-20.73 38.4-9.34 8.9-20.5 13.3-33.52 13.3-13.26 0-22.25-4.3-27-13-4.76-8.7-4.92-21.3-.5-37.8s11.47-29.4 21.17-38.7 21.04-13.95 34.06-13.95c13 0 21.9 4.5 26.4 13.43 4.6 8.97 4.7 21.8.2 38.5zm23.52-87.8-6.72 25.1c-2.9-9-8.53-16.2-16.85-21.6-8.34-5.3-18.66-8-30.97-8-15.1 0-29.6 3.9-43.5 11.7s-26.1 18.8-36.5 33-18 30.3-22.9 48.4c-4.8 18.2-5.8 34.1-2.9 47.9 3 13.9 9.3 24.5 19 31.9 9.8 7.5 22.3 11.2 37.6 11.2a82.4 82.4 0 0 0 35.2-7.7 82.11 82.11 0 0 0 28.4-21.2l-7 26.16h51.9l47.39-176.77h-52zm238.65 0h-150.93l-10.55 39.4h87.82l-116.1 100.3-9.92 37h155.8l10.55-39.4h-94.1l117.88-101.8m142.4 52c-4.67 17.4-11.6 30.48-20.75 39-9.15 8.6-20.23 12.9-33.24 12.9-27.2 0-36.14-17.3-26.86-51.9 4.6-17.2 11.56-30.13 20.86-38.84 9.3-8.74 20.57-13.1 33.82-13.1 13 0 21.78 4.33 26.3 13.05 4.52 8.7 4.48 21.67-.13 38.87m30.38-80.83c-11.95-7.44-27.2-11.16-45.8-11.16-18.83 0-36.26 3.7-52.3 11.1a113.09 113.09 0 0 0 -41 32.06c-11.3 13.9-19.43 30.2-24.42 48.8-4.9 18.53-5.5 34.8-1.7 48.73 3.8 13.9 11.8 24.6 23.8 32 12.1 7.46 27.5 11.17 46.4 11.17 18.6 0 35.9-3.74 51.8-11.18 15.9-7.48 29.5-18.1 40.8-32.1 11.3-13.94 19.4-30.2 24.4-48.8s5.6-34.84 1.8-48.8c-3.8-13.9-11.7-24.6-23.6-32.05m185.1 40.8 13.3-48.1c-4.5-2.3-10.4-3.5-17.8-3.5-11.9 0-23.3 2.94-34.3 8.9-9.46 5.06-17.5 12.2-24.3 21.14l6.9-25.9-15.07.06h-37l-47.7 176.7h52.63l24.75-92.37c3.6-13.43 10.08-24 19.43-31.5 9.3-7.53 20.9-11.3 34.9-11.3 8.6 0 16.6 1.97 24.2 5.9m146.5 41.1c-4.5 16.5-11.3 29.1-20.6 37.8-9.3 8.74-20.5 13.1-33.5 13.1s-21.9-4.4-26.6-13.2c-4.8-8.85-4.9-21.6-.4-38.36 4.5-16.75 11.4-29.6 20.9-38.5 9.5-8.97 20.7-13.45 33.7-13.45 12.8 0 21.4 4.6 26 13.9s4.7 22.2.28 38.7m36.8-81.4c-9.75-7.8-22.2-11.7-37.3-11.7-13.23 0-25.84 3-37.8 9.06-11.95 6.05-21.65 14.3-29.1 24.74l.18-1.2 8.83-28.1h-51.4l-13.1 48.9-.4 1.7-54 201.44h52.7l27.2-101.4c2.7 9.02 8.2 16.1 16.6 21.22 8.4 5.1 18.77 7.63 31.1 7.63 15.3 0 29.9-3.7 43.75-11.1 13.9-7.42 25.9-18.1 36.1-31.9s17.77-29.8 22.6-47.9c4.9-18.13 5.9-34.3 3.1-48.45-2.85-14.17-9.16-25.14-18.9-32.9m174.65 80.65c-4.5 16.7-11.4 29.5-20.7 38.3-9.3 8.86-20.5 13.27-33.5 13.27-13.3 0-22.3-4.3-27-13-4.8-8.7-4.9-21.3-.5-37.8s11.42-29.4 21.12-38.7 21.05-13.94 34.07-13.94c13 0 21.8 4.5 26.4 13.4 4.6 8.93 4.63 21.76.15 38.5zm23.5-87.85-6.73 25.1c-2.9-9.05-8.5-16.25-16.8-21.6-8.4-5.34-18.7-8-31-8-15.1 0-29.68 3.9-43.6 11.7-13.9 7.8-26.1 18.74-36.5 32.9s-18 30.3-22.9 48.4c-4.85 18.17-5.8 34.1-2.9 47.96 2.93 13.8 9.24 24.46 19 31.9 9.74 7.4 22.3 11.14 37.6 11.14 12.3 0 24.05-2.56 35.2-7.7a82.3 82.3 0 0 0 28.33-21.23l-7 26.18h51.9l47.38-176.7h-51.9zm269.87.06.03-.05h-31.9c-1.02 0-1.92.05-2.85.07h-16.55l-8.5 11.8-2.1 2.8-.9 1.4-67.25 93.68-13.9-109.7h-55.08l27.9 166.7-61.6 85.3h54.9l14.9-21.13c.42-.62.8-1.14 1.3-1.8l17.4-24.7.5-.7 77.93-110.5 65.7-93 .1-.06h-.03z"/></svg>
	
			</div>
	
		</div>
	
	</div>
	<!-- footer two ends -->
	
	<!-- footer three starts -->
	
	<div class="footer-three">
	
		<div class="copyright">
	
			<p><b>©</b> 2023, <span><a href="${root}/index.jsp">AgroKart</span></a></p>
			<p>All Rights Reserved</p>
	
		</div>
	
		<div class="social-media">
	
			<div class="links">
	
				<p>Follow us</p>
				<a href="#" aria-label="socialmedia"><i class="fa-brands fa-linkedin"></i></a>
				<a href="#" aria-label="socialmedia"><i class="fa-brands fa-youtube"></i></a>
				<a href="#" aria-label="socialmedia"><i class="fa-brands fa-facebook"></i></a>
				<a href="#" aria-label="socialmedia"><i class="fa-brands fa-instagram"></i></a>
				<a href="#" aria-label="socialmedia"><i class="fa-brands fa-twitter"></i></a>
	
			</div>
	
			<p>First Order Discount: <b>15%</b></p>
	
		</div>
	
	</div>
	
	<!-- footer three ends -->
	
	</footer>`;

	return footer;
}

// contains the logic to append the header and footer regarding the user state
function appendHeaderFooter() {

	// to append the above elements

	if (logged_email !== null) {
		document.body.insertAdjacentHTML("afterbegin", appendHeader());

		document.body.insertAdjacentHTML("afterend", appendFooter());

		document.getElementById("login-btn").style.display = "none";

		document.getElementById("mobile-login-btn").style.display = "none";

		document.getElementById("login-btn-foot").style.display = "none";
	} else {
		document.body.insertAdjacentHTML("afterbegin", appendHeader());

		document.getElementById("my-profile").style.display = "none";

		document.getElementById("mobile-profile").style.display = "none";

		document.body.insertAdjacentHTML("afterend", appendFooter());
	}

}

// contains password basic setup
function passwordEyeSet() {

	const demo_login = document.getElementById("password");
	const demo_register = document.getElementById("reg-password");
	const demo_confirm = document.getElementById("conf-password");

	const demo_eye_login = document.getElementById("login-password");
	const demo_reg_password_eye = document.getElementById("reg-password-eye");
	const demo_confirm_eye = document.getElementById("reg-confirm-password");

	document.getElementById("login-password").onclick = () =>
		showPwd(demo_login.id, demo_eye_login);
	document.getElementById("reg-password-eye").onclick = () =>
		showPwd(demo_register.id, demo_reg_password_eye);
	document.getElementById("reg-confirm-password").onclick = () =>
		showPwd(demo_confirm.id, demo_confirm_eye);

}

// password eye
function showPwd(id, el) {
	const x = document.getElementById(id);
	if (x.type === "password") {
		x.type = "text";
		el.className = "fa fa-eye-slash showpwd";
	} else {
		x.type = "password";
		el.className = "fa fa-eye showpwd";
	}
}

function setEventListerForForm() {
	// to show the login form

	document.getElementById("login-btn").addEventListener("click", () => {
		document.querySelector(".one-form").style.display = "block";
	});

	// redirect to the register page

	document.querySelector(".register-here").addEventListener("click", () => {
		document.querySelector(".one-form").style.display = "none";

		document.querySelector(".two-form").style.display = "block";
	});

	// in register btn to direct to login page

	document.querySelector(".register-login").addEventListener("click", () => {
		document.querySelector(".one-form").style.display = "block";

		document.querySelector(".two-form").style.display = "none";
	});

	// footer register bth

	document.getElementById("login-btn-foot").addEventListener("click", () => {
		document.querySelector(".one-form").style.display = "block";
	});

	// to close the login form

	document.querySelector(".login-close").addEventListener("click", () => {
		document.querySelector(".one-form").style.display = "none";
	});

	// to close the register form

	document.querySelector(".register-close").addEventListener("click", () => {
		document.querySelector(".two-form").style.display = "none";
	});

	// mobile nav

	document.querySelector(".side-menu-mobile").style.display = "none";

	document.querySelector(".mobile-open").addEventListener("click", () => {
		if (document.querySelector(".side-menu-mobile").style.display === "none") {
			document.querySelector(".side-menu-mobile").style.display = "block";

			document.querySelector(".mobile_search_result_append").style.display =
				"none";
		} else {
			document.querySelector(".side-menu-mobile").style.display = "none";
		}
	});

	document.getElementById("mobile-login-btn").addEventListener("click", () => {
		document.querySelector(".one-form").style.display = "block";

		document.querySelector(".side-menu-mobile").style.display = "none";
	});

}

function isDescendant(parent, child) {
	let node = child.parentNode;
	while (node != null) {
		if (node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

// Add a click event listener to the window
window.addEventListener("click", (event) => {
	const mobileNav = document.querySelector(".side-menu-mobile");
	const mobileOpen = document.querySelector(".mobile-open");

	if (mobileNav.style.display === "block" && !isDescendant(mobileNav, event.target) && event.target !== mobileOpen) {
		mobileNav.style.display = "none";
	}
});

// an asynchronous function to set the session for the user
async function setSessionForUser(email) {
	const params = new URLSearchParams({ action: "setSession", email });
	const fullUrl = `${UserServlet}?${params.toString()}`;
	try {
		const response = await axios.post(fullUrl);
		return response.data.trim();

	} catch (error) {
		throw error;

	}
}

async function login_validateInputs() {
	const email_id = document.getElementById("email-id").value.trim();
	const password = document.getElementById("password").value.trim();

	const params = new URLSearchParams({ action: "login", email: email_id, password });

	const fullUrl = `${UserServlet}?${params.toString()}`;

	try {

		const response = await axios.post(fullUrl);

		if (response.data.trim() === "success") {

			const isSesssionSet = await setSessionForUser(email_id);

			if (isSesssionSet === "success") {

				Notify.success("Login Successfull!");

				form.reset();

				window.location.href = `${root}/index.jsp`;
			} else {

				Notify.error(isSesssionSet);
			}

		} else {
			Notify.error("Invalid User Credentials");

			form.reset();

		}

	} catch (error) {

		handleGenericError(error);
	}
}

async function validateInputs() {

	const first_name = document.getElementById("first-name").value.trim();
	const last_name = document.getElementById("last-name").value.trim();
	const email_id = document.getElementById("reg-email-id").value.trim();
	const mobilenumber = document.getElementById("mobile-number").value.trim();
	const password = document.getElementById("reg-password").value.trim();
	const conf_password = document.getElementById("conf-password").value.trim();

	const params = new URLSearchParams({ action: "register", first_name, last_name, email_id, mobilenumber, password });


	try {

		// Use async/await to wait for the result of check_already_user
		const isUserNotAlreadyRegistered = await check_already_user(email_id, mobilenumber);

		// this function returns the check user true or false

		if (isUserNotAlreadyRegistered) {

			if (password === conf_password) {

				createNewUser(params);

			} else {
				Notify.error("Confirm password doesn't match password!");
			}

		}
		else {
			Notify.error("Already Have a Account Please Login");

			document.querySelector(".two-form").style.display = "none";

			document.querySelector(".one-form").style.display = "block";

			reg_form.reset();
		}

	} catch (error) {

		handleGenericError(error);
	}

}

async function createNewUser(user) {

	const fullUrl = `${UserServlet}?${user.toString()}`;

	try {

		const response = await axios.post(fullUrl);

		if (response.data.trim() === "success") {

			Notify.success("Account Created Successfully!");

			document.querySelector(".two-form").style.display = "none";

			document.querySelector(".one-form").style.display = "block";

			reg_form.reset();

		} else {

			Notify.error(response.data.trim());
		}
	} catch (error) {

		handleGenericError(error);
	}

}
// check the user already registered or not
async function check_already_user(email_id, mobilenumber) {

	const params = new URLSearchParams({ action: "checkreg", email: email_id, mobile_number: mobilenumber });
	const fullUrl = `${UserServlet}?${params.toString()}`;

	try {
		const response = await axios.post(fullUrl);
		return response.data.trim() === "success"; // Return true or false based on the response
	} catch (error) {
		throw error;
	}
}

// append the header and footer regarding the user state
appendHeaderFooter();

// functions for login
const form = document.getElementById("loginform");
// functions for register form
const reg_form = document.getElementById("form");

// set the password eye event listener
passwordEyeSet();

// setting the event listner for forms
setEventListerForForm();

// event lister for login submit btn
form.addEventListener("submit", async (e) => {
	e.preventDefault();
	login_validateInputs();

});

// event listner for register submit
reg_form.addEventListener("submit", async (e) => {
	e.preventDefault();
	validateInputs();
});

// desktop search bar event listner

document.querySelector(".search_results_append").style.display = "none";

const search_bar = document.getElementById("header_search");

search_bar.addEventListener("input", () => {
	document.querySelector(".search_results_append").innerHTML = "";

	if (search_bar.value === "") {
		document.querySelector(".search_results_append").style.display = "none";
	} else {
		document.querySelector(".search_results_append").style.display = "block";
	}

	const search_value = search_bar.value.toLowerCase();

	desktop_searh(search_value);
});

// desktop search find products
function desktop_searh(search_value) {
	// desktop search bar function
	const results_arr = products_db.filter((item) => {
		const pro_name = item.name.englishName;

		const lc_pro_name = pro_name.toLowerCase();

		if (lc_pro_name.includes(search_value) && item.status === "AVAILABLE") {
			return item;
		}
		return null;
	});

	desktop_append_search(results_arr);
}

// desktop append the find products
function desktop_append_search(results_arr = []) {
	if (results_arr.length !== 0) {
		results_arr.forEach((obj) => {
			const href =
				`${root}/pages/product_details/details.jsp?` +
				`id=${obj.id}&` +
				`cat=${obj.category}`;

			const a_href = document.createElement("a");
			a_href.setAttribute("href", href);
			a_href.innerHTML = `<img src="${obj.imageUrl}" alt="image of ${obj.imageUrl}"><p>${obj.name.englishName}</p>`;

			document.querySelector(".search_results_append").appendChild(a_href);
		});
	} else {
		document.querySelector(
			".search_results_append"
		).innerHTML = `<p class="no-products-found">No products found</h1>`;
	}
}

// mobile search bar event listner
document.querySelector(".mobile_search_result_append").style.display = "none";

const mobile_search = document.getElementById("mobile_search");

mobile_search.addEventListener("input", () => {
	document.querySelector(".mobile_search_result_append").innerHTML = "";

	if (mobile_search.value === "") {
		document.querySelector(".mobile_search_result_append").style.display =
			"none";
	} else {
		document.querySelector(".mobile_search_result_append").style.display =
			"block";
	}

	const search_value = mobile_search.value.toLowerCase();

	mobile_search_fun(search_value);
});

// mobile search bar

function mobile_search_fun(search_value) {
	const result_arr = products_db.filter((item) => {
		const pro_name = item.name.englishName;

		const lc_pro_name = pro_name.toLowerCase();

		if (lc_pro_name.includes(search_value) && item.status) {
			return item;
		}

		return null;
	});

	mobile_search_append(result_arr);
}

function mobile_search_append(result_arr = []) {
	if (result_arr.length !== 0) {
		result_arr.forEach((obj) => {
			const href =
				`${root}/pages/product_details/details.jsp?` +
				`id=${obj.id}&` +
				`cat=${obj.category}`;

			const a_href = document.createElement("a");
			a_href.setAttribute("href", href);
			a_href.innerHTML = `<img src="${obj.imageUrl}" alt="image of ${obj.name.englishName}"><p>${obj.name.englishName}</p>`;

			document
				.querySelector(".mobile_search_result_append")
				.appendChild(a_href);
		});
	} else {
		document.querySelector(
			".mobile_search_result_append"
		).innerHTML = `<p class="no-products-found">No products found</h1>`;
	}
}


export { findUserRecordByEmail, getCurrentUser, UserServlet, logged_email };
