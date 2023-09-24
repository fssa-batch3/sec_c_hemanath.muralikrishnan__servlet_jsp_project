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
	href="<%=request.getContextPath()%>/assets/css/company/about_us.css"
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

<!-- login and register css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/login.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/authentication/register.css">

<!-- notify css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/notify.css">

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
			<li>About Us</li>
		</ul>

	</div>
	<!-- end of list top -->

	<!-- start of about main sec -->

	<div class="about-us">

		<p class="about-title">About Agrokart</p>

		<div class="about-us-content">

			<p>We are building to be the most efficient fresh produce supply
				chain platform delivering freshly hand-picked fruits & vegetables
				right at your doorsteps, which is operational in Tier-2 and Tier-3
				towns of India, catering to 2,00,000+ customers with the fresh
				produce from farms to plates within 12 hours of harvest.</p>

			<img
				src="<%=request.getContextPath()%>/assets/images/hassle/about-img.png"
				alt="about-us-img">

		</div>

	</div>

	<!-- end start of about main sec -->

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
