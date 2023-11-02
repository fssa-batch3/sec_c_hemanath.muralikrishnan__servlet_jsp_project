package com.fssa.agrokart.admin;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.model.Product;
import com.fssa.agrokart.service.ProductService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class ReadAllProductServlet
 */
@WebServlet("/ReadAllProductServlet")
public class ReadAllProductServlet extends HttpServlet {


	ProductService service = new ProductService();

	/**
	 * Handles HTTP GET requests for reading all products and returning them as
	 * JSON.
	 *
	 * @param request  The HTTP request object (unused in this case).
	 * @param response The HTTP response object for sending the list of products as
	 *                 JSON.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			// Retrieve a list of all products using the ProductService
			List<Product> listOfProducts = service.readAllProducts();

			JSONArray jsonResponse = new JSONArray(listOfProducts);

			// Set the character encoding to UTF-16
			response.setCharacterEncoding("UTF-16");

			// Write the JSON response to the client
			response.getWriter().write(jsonResponse.toString());

		} catch (ServiceException e) {
			// Log the ServiceException and send an error response with the exception
			// message
			ExceptionLoggerUtil.logException(e);
			response.getWriter().write(e.getMessage());
		}
	}
}
