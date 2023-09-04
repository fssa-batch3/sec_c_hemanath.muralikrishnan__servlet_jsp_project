package com.fssa.agrokart.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.service.ProductService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class UpdateStatusServlet
 */
@WebServlet("/UpdatestatusServlet")
public class UpdateStatusServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ProductService service = new ProductService();

	/**
	 * Handles HTTP POST requests for updating the status of a product.
	 *
	 * @param request  The HTTP request object containing the new status and product
	 *                 ID.
	 * @param response The HTTP response object for sending success or error
	 *                 messages.
	 * @throws ServletException If an error occurs during servlet processing.
	 * @throws IOException      If an I/O error occurs while handling the request or
	 *                          response.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Get the new status and product ID from the request parameters
		String status = request.getParameter("status");
		int id = Integer.parseInt(request.getParameter("index"));

		try {
			// Update the product status using the ProductService
			if (service.updateProductStatus(status, id)) {
				response.getWriter().write("success");
			}
		} catch (ServiceException e) {
			ExceptionLoggerUtil.logException(e);
			response.getWriter().write(e.getMessage());
		}
	}
}
