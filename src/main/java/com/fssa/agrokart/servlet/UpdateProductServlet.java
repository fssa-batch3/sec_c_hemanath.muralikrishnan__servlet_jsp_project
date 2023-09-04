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

/**
 * Servlet implementation class UpdateProductServlet
 */
@WebServlet("/UpdateproductServlet")
public class UpdateProductServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ProductService service = new ProductService();

	/**
	 * Handles HTTP POST requests for updating a product by its ID.
	 *
	 * @param request  The HTTP request object containing the product ID and updated
	 *                 data.
	 * @param response The HTTP response object for sending success or error
	 *                 messages.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			// Parse the product ID from the request parameter
			int id = Integer.parseInt(request.getParameter("id"));

			// Generate a Product object from the request data
			Product product = generateProduct(request);

			// Update the product by its ID using the ProductService
			if (service.updateProductById(id, product)) {
				response.getWriter().write("success");
			}

		} catch (Exception e) {
			ExceptionLoggerUtil.logException(e);
			// Handle errors and set error response
			response.getWriter().write(e.getMessage());
		}
	}

	/**
	 * Generates a Product object from the data provided in the HTTP request.
	 *
	 * @param request The HTTP request object containing the product data.
	 * @return A Product object with data parsed from the request.
	 */
	private Product generateProduct(HttpServletRequest request) {

		Product product = new Product();

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

		ProductName name = new ProductName();
		name.setEnglishName(engName);
		name.setTamilName(tamName);
		product.setName(name);

		// Set the image URL, category, and description
		product.setImageUrl(imageUrl);
		product.setCategory(cat);
		product.setDescription(description);

		// Set nutrition data
		ProductNutrition nutr = new ProductNutrition();
		nutr.setProteinNum(protein);
		nutr.setCarbonNumb(carbohydrates);
		nutr.setKcalNum(calories);
		product.setNutrition(nutr);

		// Set available stock data
		ProductAvailableStock stock = new ProductAvailableStock();
		stock.setNum(avblNums);
		stock.setUnit(avblUnit);
		product.setAvailableStock(stock);

		// Parse and set quantities data from JSON
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

		// Set the quantities data in the product
		product.setQuantities(convertedSet);

		return product;
	}
}
