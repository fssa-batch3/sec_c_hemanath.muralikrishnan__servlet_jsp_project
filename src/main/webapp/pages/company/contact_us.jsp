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
	href="<%=request.getContextPath()%>/assets/css/company/contact_us.css"
	type="text/css">
<!-- stylesheet -->

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->

<!-- login and register css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/login.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/register.css">

<!-- notify css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/notify.css">

<link rel="icon" type="image/png" sizes="60x32"
	href="<%=request.getContextPath()%>/assets/images/tabicon/icon.png">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/loading.css">

<title>AgroKart - Ecommerce</title>
</head>

<body>
	<jsp:include page="../loading.jsp"></jsp:include>

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
			<li><a
				href="<%=request.getContextPath()%>/pages/company/contact_us.jsp">Contact
					Us</</li>

		</ul>

	</div>
	<!-- end of list top -->

	<!-- start of contact us sec -->

	<div class="contact-us-main">

		<div class="contact-us-left-side">

			<p class="contact-title">Contact Us</p>

			<div class="google-map">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.1167529336!2d80.06892677525377!3d13.047487786872004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1670757911849!5m2!1sen!2sin"
					title="company-location" width="600" height="450"
					style="border: 0;" allowfullscreen="" loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"></iframe>
			</div>

			<div class="contact-us-details">

				<div class="contact-content">

					<i class="fa-solid fa-location-dot"></i>
					<p>
						<b> Address:</b> <a href="https://goo.gl/maps/bYL8xG6sQ8hjbHZA6">Chennai,
							Tamil Nadu</a>
					</p>

				</div>

				<div class="contact-content">

					<i class="fa-solid fa-phone"></i>
					<p>
						<b>Call Us:</b> <a href="tel:+91 1234567890">+91 1234567890</a>
					</p>

				</div>

				<div class="contact-content">

					<i class="fa-solid fa-envelope"></i>
					<p>
						<b>Email:</b> <a href="mailto:john@example.com">example@gmail.com</a>
					</p>

				</div>

			</div>

		</div>

		<div class="contact-us-right-side">

			<p>Let's Get in Touch</p>

			<form
				action="https://getform.io/f/ba316959-8da7-4439-bc60-c9db87f2dcb8"
				method="POST">

				<input class="no-outline" type="text" placeholder="Name" name="name"
					required pattern="[A-Za-z ]{1,16}" minlength="1" maxlength="16">

				<input class="no-outline" type="email" placeholder="Email"
					name="email_id" required> <input class="no-outline"
					type="text" placeholder="Subject" name="subject" required>

				<label for="message">Message</label>

				<textarea rows="4" cols="50" id="message" name="message" required>Enter Your Message Here!</textarea>

				<button type="submit">Send Message</button>

			</form>

		</div>

	</div>

	<!-- end of contact us sec -->

	<!-- footer start -->

	<!-- footer ends -->

	<!-- logged check js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/is_logged.js"></script>

	<!-- wishlist count -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/wishlist/wishlist_count.js"></script>

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/cart_count.js"></script>

	<!-- notify js -->

	<script type="module"
		src="<%=request.getContextPath()%>/assets/js/vendor/notify.js"></script>
</body>

</html>