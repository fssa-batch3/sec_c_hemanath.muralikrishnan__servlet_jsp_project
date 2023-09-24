package com.fssa.agrokart.user;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.model.UserAddress;
import com.fssa.agrokart.service.UserAddressService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class UserAddressServlet
 */
@WebServlet("/UserAddress")
public class UserAddressServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	List<UserAddress> tempAddress = new ArrayList<>();
	UserAddressService useraddressService = new UserAddressService();
	private static final int CUST0M_STATUS_CODE = 600;

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

		if (action.equals("addAddress")) {

			try {
				UserAddress newAddress = new UserAddress();
				newAddress.setUserId(Integer.parseInt(request.getParameter("userId")));
				newAddress.setFullName(request.getParameter("full_name_value"));
				newAddress.setAddress(request.getParameter("full_address_value"));
				newAddress.setPincode(request.getParameter("pincode_value"));
				newAddress.setPhoneNumber(request.getParameter("phonenumber_value"));

				if (useraddressService.addAddress(newAddress)) {

					response.getWriter().write("success");
				} else {
					response.getWriter().write("failed");
				}

			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());

			}

		}

		if (action.equals("deleteAddress")) {

			int id = Integer.parseInt(request.getParameter("index"));

			try {

				if (useraddressService.deleteAddress(id)) {

					response.getWriter().write("success");
				} else {
					response.getWriter().write("failed");
				}
			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());

			}
		}

		if (action.equals("updateAddress")) {

			try {
				UserAddress newAddress = new UserAddress();
				newAddress.setId(Integer.parseInt(request.getParameter("id")));
				newAddress.setFullName(request.getParameter("full_name_value"));
				newAddress.setAddress(request.getParameter("full_address_value"));
				newAddress.setPincode(request.getParameter("pincode_value"));
				newAddress.setPhoneNumber(request.getParameter("phonenumber_value"));

				if (useraddressService.updateAddress(newAddress)) {

					response.getWriter().write("success");
				} else {
					response.getWriter().write("failed");
				}

			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());

			}

		}

		if (action.equals("getAddressById")) {

			int id = Integer.parseInt(request.getParameter("index"));

			try {

				UserAddress address = useraddressService.getAddressById(id);

				if (address != null) {

					JSONObject addressJSON = new JSONObject(address);
					response.getWriter().write(addressJSON.toString());

				} else {

					response.getWriter().write("null");
				}

			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());

			}
		}

		if (action.equals("readAllAddress")) {

			int userId = Integer.parseInt(request.getParameter("userId"));

			List<UserAddress> listOfAddress = new ArrayList<>();

			try {

				listOfAddress = useraddressService.readAllAddress(userId);

				JSONArray list = new JSONArray(listOfAddress);

				response.getWriter().write(list.toString());

				tempAddress.addAll(listOfAddress);

			} catch (ServiceException e) {

				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}
		}

		if (action.equals("deleteAllAddressTemp")) {

			tempAddress.clear();

			response.getWriter().write("success");
		}

		if (action.equals("getAllTempAddress")) {

			JSONArray list = new JSONArray(tempAddress);

			response.getWriter().write(list.toString());

		}

	}

}
