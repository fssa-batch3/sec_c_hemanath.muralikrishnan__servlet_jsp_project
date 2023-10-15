package com.fssa.agrokart.user;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.service.ProductService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class CategoryServlet
 */

@WebServlet("/GetCategoryCount")
public class CategoryServlet extends HttpServlet {

	private static final int CUST0M_STATUS_CODE = 600;

	ProductService service = new ProductService();

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {

			JSONObject obj = new JSONObject(service.getCatCounts());
			response.getWriter().write(obj.toString());

		} catch (ServiceException e) {

			ExceptionLoggerUtil.logException(e);
			response.sendError(CUST0M_STATUS_CODE, "Failed to get category counts");
		}
	}

}
