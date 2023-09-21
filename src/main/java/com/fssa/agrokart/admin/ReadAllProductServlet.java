package com.fssa.agrokart.admin;

import java.io.IOException;
import java.io.PrintWriter;
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

	private static final long serialVersionUID = 858279837616370892L;
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

		PrintWriter out = response.getWriter();

		try {
			// Retrieve a list of all products using the ProductService
			List<Product> listOfProducts = service.readAllProducts();

			JSONArray jsonResponse = new JSONArray(listOfProducts);

			System.out.println(jsonResponse);

			// Set the character encoding to UTF-8
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Content-Type", "text/html; charset=UTF-8");
			// Set the content type to JSON with UTF-8 encoding
			response.setContentType("application/json; charset=UTF-8");

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
