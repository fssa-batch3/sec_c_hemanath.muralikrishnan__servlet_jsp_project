<%@ page language="java" contentType="text/html; charset=UTF-16"
	pageEncoding="UTF-16"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-16">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
	integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
	crossorigin="anonymous">

<!-- fontawesome stylesheet -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	crossorigin="anonymous" referrerpolicy="no-referrer">
<!-- fontawesome stylesheet -->
<!-- body css -->

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/admin/assets/css/loading.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/admin/assets/css/body.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/admin/assets/css/list-product.css">

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/admin/assets/css/product-form.css">

<!-- notify css -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/admin/assets/css/notify.css">

<!-- Load necessary libraries -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/gh/suryaumapathy2812/notify__js/notify.js"></script>

<link rel="icon" type="image/png" sizes="32x32"
	href="https://freeimghost.net/images/2023/09/06/icon.png">

<title>AgroKart - Product CRUD</title>
</head>
<body>

	<jsp:include page="loading.jsp"></jsp:include>

	<div class="list-create-products">

		<div class="table-header">
			<h2>Products that are created</h2>
			<button id="create-product" class="create_product">
				Create Product <i class="fa-solid fa-plus"></i>
			</button>
		</div>


		<table>

			<caption>created products listing</caption>

			<thead>
				<th>S.No</th>
				<th>Seller Id</th>
				<th>Product Category</th>
				<th>Product Image</th>
				<th>Product Name</th>
				<th>Available Stock(in KG / Nos / Pkt)</th>
				<th>View</th>
				<th>Edit</th>
				<th>Status</th>
				<th>Delete</th>
			</thead>

			<tbody class="table_body">

			</tbody>

		</table>

	</div>

	<div class="edit-product-all">

		<span class="close" id="close_form"> <i
			class="fa-solid fa-square-xmark"></i>
		</span>

		<jsp:include page="product-form.jsp"></jsp:include>

	</div>


	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
		integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
		crossorigin="anonymous"></script>

	<script defer type="module"
		src="<%=request.getContextPath()%>/admin/assets/js/loading.js"></script>
	<script defer type="module"
		src="<%=request.getContextPath()%>/admin/assets/js/temp-quantity.js"></script>
	<script defer type="module"
		src="<%=request.getContextPath()%>/admin/assets/js/list-product.js"></script>
	<script defer type="module"
		src="<%=request.getContextPath()%>/admin/assets/js/getUrl.js"></script>
</body>
</html>