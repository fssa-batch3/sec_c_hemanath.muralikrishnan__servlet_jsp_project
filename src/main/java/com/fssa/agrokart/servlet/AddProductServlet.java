package com.fssa.agrokart.servlet;

import java.io.IOException;
import java.util.TreeSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import com.fssa.agrokart.model.Product;
import com.fssa.agrokart.model.ProductAvailableStock;
import com.fssa.agrokart.model.ProductCategory;
import com.fssa.agrokart.model.ProductName;
import com.fssa.agrokart.model.ProductNutrition;
import com.fssa.agrokart.model.ProductQuantitiesCategory;
import com.fssa.agrokart.model.ProductStatus;
import com.fssa.agrokart.model.ProductStockUnits;
import com.fssa.agrokart.service.ProductService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

@WebServlet("/AddProductAjaxServlet")
public class AddProductServlet extends HttpServlet {

	private static final long serialVersionUID = 2659016174246549673L;
	ProductService service = new ProductService();

	/**
	 * Handles HTTP POST requests for adding a product.
	 *
	 * @param request  The HTTP request object containing product data.
	 * @param response The HTTP response object for sending success or error
	 *                 messages.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			// Generate a Product object from the HTTP request data
			Product product = generateProduct(request);

			if (service.addProduct(product)) {
				// Send a success response if the product is added successfully
				response.getWriter().write("success");
			} else {
				// Throw an exception and send an error response if the product is not added.
				throw new Exception("Product not added.");
			}

		} catch (Exception e) {
			// Log the exception and send an error response with the exception message
			ExceptionLoggerUtil.logException(e);
			response.getWriter().write(e.getMessage());
		}

	}

	/**
	 * Generates a Product object from the HTTP request data.
	 *
	 * @param request The HTTP request object containing product data as parameters.
	 * @return A Product object created from the request data.
	 */
	private Product generateProduct(HttpServletRequest request) {

		Product product = new Product();

		// Retrieve product data from request parameters
		String imageUrl = request.getParameter("imageUrl");
		String engName = request.getParameter("engName");
		String tamName = request.getParameter("tamName");

		String category = request.getParameter("categoryName");
		ProductCategory cat = ProductCategory.valueOf(category);

		String description = request.getParameter("product_desc");

		String proteinNum = request.getParameter("protein_value");
		double protein = Double.parseDouble(proteinNum);

		String carboNum = request.getParameter("carbon_value");
		double carbohydrates = Double.parseDouble(carboNum);

		String calNum = request.getParameter("kcal_value");
		double calories = Double.parseDouble(calNum);

		String avblNum = request.getParameter("weight");
		double avblNums = Double.parseDouble(avblNum);

		String avblWeight = request.getParameter("unit");
		ProductStockUnits avblUnit = ProductStockUnits.valueOf(avblWeight);

		// Create a ProductName object
		ProductName name = new ProductName();
		name.setEnglishName(engName);
		name.setTamilName(tamName);
		product.setName(name);

		// Set product image URL
		product.setImageUrl(imageUrl);

		// Set product category
		product.setCategory(cat);

		// Set product description
		product.setDescription(description);

		// Create a ProductNutrition object
		ProductNutrition nutr = new ProductNutrition();
		nutr.setProteinNum(protein);
		nutr.setCarbonNumb(carbohydrates);
		nutr.setKcalNum(calories);
		product.setNutrition(nutr);

		// Create a ProductAvailableStock object
		ProductAvailableStock stock = new ProductAvailableStock();
		stock.setNum(avblNums);
		stock.setUnit(avblUnit);
		product.setAvailableStock(stock);

		// Retrieve and process quantity and price data from JSON
		String jsonQtyArrayString = request.getParameter("qty_cat");
		JSONArray jsonArray = new JSONArray(jsonQtyArrayString);
		TreeSet<ProductQuantitiesCategory> convertedSet = new TreeSet<>();

		for (int i = 0; i < jsonArray.length(); i++) {
			JSONObject jsonObject = jsonArray.getJSONObject(i);
			double weight = jsonObject.getDouble("weight");
			String unitString = jsonObject.getString("unit");
			ProductStockUnits unit = ProductStockUnits.valueOf(unitString);
			double price = jsonObject.getDouble("rs");

			ProductQuantitiesCategory newItem = new ProductQuantitiesCategory(weight, unit, price);
			convertedSet.add(newItem);
		}

		// Set product quantities and categories
		product.setQuantities(convertedSet);

		// Set product status
		product.setStatus(ProductStatus.AVAILABLE);

		return product;
	}
}
