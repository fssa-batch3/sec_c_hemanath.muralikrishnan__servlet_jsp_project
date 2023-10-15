<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- header stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/header.css"
	type="text/css">
<!-- header stylesheet -->

<!-- body stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/body.css"
	type="text/css">
<!-- body stylesheet -->

<!-- footer stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/base_style/footer.css"
	type="text/css">
<!-- footer stylesheet -->

<!-- stylesheet -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/profile.css"
	type="text/css">
<!-- stylesheet -->

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->

<link rel="icon" type="image/png" sizes="60x32"
	href="<%=request.getContextPath()%>/assets/images/tabicon/icon.png">

<!-- notify css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/notify.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/loading.css">

<title>AgroKart - Ecommerce</title>
</head>

<body>

	<jsp:include page="loading.jsp"></jsp:include>

	<!-- mobile device nav bar start -->

	<!-- mobile device nav bar end  -->

	<!-- end of header -->

	<!-- end of navigation -->

	<!-- start of list top -->
	<div class="list-top">

		<ul>
			<li><i class="fa-solid fa-house"></i></li>
			<li><a href="<%=request.getContextPath()%>/index.jsp">Home</a></li>
			<li><i class="fa-solid fa-angle-right"></i></li>
			<li><a href="<%=request.getContextPath()%>/pages/profile.jsp">My
					Account</a></li>
		</ul>

	</div>
	<!-- end of list top -->

	<!-- main profile container starts -->
	<div class="profile-main">

		<!-- profile section left side start -->
		<div class="profile-left-side">

			<p class="profile-title">My Profile</p>

			<div class="profile-section">

				<div class="profile-img"></div>

				<div class="profile-details">
					<p>Hello,</p>
					<p id="user-profile-name"></p>
					<p class="logout-btn" id="logout-user">
						<i class="fa-solid fa-right-from-bracket"></i> Logout
					</p>
				</div>

			</div>

			<div class="profile-options">

				<div class="account-settings">
					<i class="fa-solid fa-user"></i>
					<p>Account Settings</p>
				</div>

				<div class="profile-links">
					<a href="#profile-set">Profile Setting</a> <a href="#manage-add">Manage
						Addresses</a> <a
						href="<%=request.getContextPath()%>/pages/order/order_histroy.jsp">Order
						History</a>
				</div>

			</div>

		</div>
		<!-- profile section left side end -->

		<div class="profile-right-side">

			<div class="pro-settings-sec" id="profile-set">

				<p class="profile_title">Personal Information</p>

				<form id="profile_form">

					<div class="name-input flex_so">
						<label for="first_name">Name</label> <input type="text"
							id="first_name" class="form-control" pattern="^[A-Za-z]+$"
							title="please enter valid firstname" placeholder="first name"
							disabled="true" required minlength="3" maxlength="20"> <input
							type="text" id="last_name" class="form-control"
							pattern="^[A-Za-z]+$" title="please enter valid last_name"
							placeholder="last name" disabled="true" required minlength="1"
							maxlength="20">
					</div>

					<div class="gender-sec flex_so">
						<p class="gender">Gender</p>
						<label for="male"> <input type="radio" id="male"
							name="gender" disabled="true" value="MALE" required> Male
						</label> <label for="female"> <input type="radio" id="female"
							name="gender" disabled="true" value="FEMALE"> Female <label
							for="female"> <input type="radio" id="others"
								name="gender" disabled="true" value="OTHERS"> OTHERS
						</label>
					</div>

					<div class="email-input flex_so">
						<label for="email-addrees">Email</label> <input type="text"
							class="form-control" placeholder="exmaple@gmail.com"
							id="email-address" disabled="true"
							pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}">
					</div>

					<div class="mobile-input flex_so">
						<label for="profile-mobile-number">Mobile Number</label> <input
							type="tel" class="form-control" placeholder="+1234567890"
							id="profile-mobile-number" pattern="^[6-9][0-9]{9}$"
							title="Please enter valid mobile number" disabled="true"
							minlength="10" maxlength="10" required>
					</div>

					<div class="profile_buttons">
						<button id="save-profile" type="submit" class="save_profile">Save
							Profile</button>
						<button id="edit-profile" class="edit_profile">Edit
							Profile</button>
					</div>

				</form>

			</div>

			<div class="manage-address" id="manage-add">

				<p class="address_title">Manage Address</p>

				<p class="add-new-address" id="add_new_address">+ Add a new
					address</p>

				<!-- new address form -->

				<form id="address_form">

					<div class="address-form">

						<span class="close" id="address_close_form"> <i
							class="fa-solid fa-square-xmark"></i>
						</span>

						<div class="address-form-layers">

							<div class="address_input">
								<label for="full-name-input">Full Name:</label> <input
									type="text" id="full-name-input" class="form-control"
									placeholder="Enter your full name" required="true"
									pattern="^(?!.*(\s\s))[A-Za-z ]{3,20}(?:\s[A-Za-z ]{1,20})*$"
									title="Please enter a valid full name with alphabets, spaces, and words between 3 and 20 characters in length. Consecutive spaces are not allowed."
									minlength="5" maxlength="30">
							</div>

							<div class="address_input">
								<label for="address-input">Full Address:</label> <input
									type="text" id="full-address-input" class="form-control"
									placeholder="Enter your full address" required="true"
									title="Please enter your full address (10-255 characters)"
									pattern="[a-zA-Z0-9\s\-\,\#\.\'\/]+" minlength="10"
									maxlength="255">
							</div>

							<div class="address_input">
								<label for="postal-code-input">Postal Code/ZIP Code:</label> <input
									type="text" id="pincode-input" class="form-control"
									required="true" placeholder="Enter your postal/zip code"
									pattern="^6\d{5}$" minlength="6" maxlength="6"
									title="Please enter a valid 6-digit postal/ZIP code starting with 6">
							</div>


							<div class="address_input">
								<label for="phone-number-input">Mobile/Phone Number:</label> <input
									type="text" id="phone-number-input" class="form-control"
									placeholder="Enter your mobile/phone number" required="true"
									pattern="^[6-9][0-9]{9}$" minlength="10" maxlength="10"
									title="Please enter a valid 10-digit mobile/phone number without alphabets, special characters, and spaces">
							</div>

							<button type="submit" class="address-save-btn">Save
								address</button>

						</div>

					</div>

				</form>
				<!-- show address from the localstorage -->

				<div class="show-address"></div>

			</div>

		</div>

	</div>
	<!-- profile section right side start -->

	<!-- profile section right side ends -->

	<!-- main profile container ends -->

	<!-- proifle js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/profile/profile.js"></script>

	<!-- wishlist count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/wishlist/wishlist_count.js"></script>

	<!-- cart count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/cart_count.js"></script>

	<!-- notify script -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/vendor/notify.js"></script>

</body>

</html>