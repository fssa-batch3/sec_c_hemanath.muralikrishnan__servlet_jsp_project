package com.fssa.agrokart.admin;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.model.Seller;
import com.fssa.agrokart.service.SellerService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class SellerServlet
 */
@WebServlet("/SellerCRUDServlet")
public class SellerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final int CUST0M_STATUS_CODE = 600;
	SellerService sellerService = new SellerService();

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");

		if (action.equals("getallsellers")) {

			try {
				List<Integer> sellerId = sellerService.getAllSellerID();
				JSONArray jsonArray = new JSONArray(sellerId);

				response.getWriter().write(jsonArray.toString());
			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}

		}

		if (action.equals("getseller")) {

			int id = Integer.parseInt(request.getParameter("index"));

			try {

				Seller seller = sellerService.getSeller(id);
				JSONObject sellerObj = new JSONObject(seller);
				response.getWriter().write(sellerObj.toString());
			} catch (ServiceException e) {

				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}

		}
	}

}
