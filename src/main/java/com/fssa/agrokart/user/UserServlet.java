package com.fssa.agrokart.user;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.agrokart.exception.ServiceException;
import com.fssa.agrokart.model.Gender;
import com.fssa.agrokart.model.User;
import com.fssa.agrokart.service.UserService;
import com.fssa.agrokart.util.ExceptionLoggerUtil;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private UserService service = new UserService();

	private static final int CUST0M_STATUS_CODE = 600;

	/**
	 * Handles HTTP GET requests.
	 *
	 * @param request  The HTTP servlet request.
	 * @param response The HTTP servlet response.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * Handles HTTP POST requests.
	 *
	 * @param request  The HTTP request object.
	 * @param response The HTTP response object.
	 * @throws ServletException If a servlet-specific error occurs.
	 * @throws IOException      If an I/O error occurs while processing the request.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");

		if (action.equals("getSession")) {
			/**
			 * Retrieves the current user's session email.
			 *
			 * @return The user's session email or "null" if not found.
			 */
			String email = (String) request.getSession().getAttribute("logged_email");
			if (email != null) {
				response.getWriter().write(email);
			} else {
				response.getWriter().write("null");
			}
		}

		if (action.equals("setSession")) {
			/**
			 * Sets the user's email in the session.
			 *
			 * @param email The email to set in the session.
			 */
			String email = request.getParameter("email");
			request.getSession().setAttribute("logged_email", email);
			response.getWriter().write("success");
		}

		if (action.equals("login")) {
			/**
			 * Handles user login attempt.
			 *
			 * @param email    The user's email.
			 * @param password The user's password.
			 * @return "success" if login is successful, error message otherwise.
			 */
			String email = request.getParameter("email");
			String password = request.getParameter("password");

			try {
				if (service.login(email, password)) {
					response.getWriter().write("success");
				} else {
					response.getWriter().write("User login failed.");
				}
			} catch (ServiceException | IOException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}
		}

		if (action.equals("checkreg")) {
			/**
			 * Checks if email or phone number exists during registration.
			 *
			 * @param email        The user's email.
			 * @param mobileNumber The user's mobile number.
			 * @return "success" if neither email nor phone number exists, error message
			 *         otherwise.
			 */
			String email = request.getParameter("email");
			String mobileNumber = request.getParameter("mobile_number");

			try {
				if (service.isEmailOrPhoneExists(email, mobileNumber)) {
					response.getWriter().write("success");
				} else {
					response.getWriter().write("User email and password already exist.");
				}
			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}
		}

		if (action.equals("register")) {
			/**
			 * Registers a new user.
			 *
			 * @param user The user object containing registration details.
			 * @return "success" if registration is successful, error message otherwise.
			 */
			try {
				User user = new User();
				user.setFirstName(request.getParameter("first_name"));
				user.setLastName(request.getParameter("last_name"));
				user.setEmailId(request.getParameter("email_id"));
				user.setPhoneNumber(request.getParameter("mobilenumber"));
				user.setPassword(request.getParameter("password"));

				if (service.register(user)) {
					response.getWriter().write("success");
				}
			} catch (ServiceException | IOException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}
		}

		if (action.equals("findUserByEmail")) {
			/**
			 * Finds a user by email.
			 *
			 * @param email The user's email.
			 * @return User object as a JSON string if found, "failed" otherwise.
			 */
			String email = request.getParameter("email");

			try {
				User user = service.getUserRecordByEmail(email);

				if (user != null) {
					JSONObject userObj = new JSONObject(user);
					response.getWriter().write(userObj.toString());
				} else {
					response.getWriter().write("failed");
				}
			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}
		}

		if (action.equals("updateProfile")) {
			/**
			 * Updates the user's profile.
			 *
			 * @param user The user object containing updated profile details.
			 * @return "success" if the update is successful, error message otherwise.
			 */
			try {
				User user = new User();
				user.setId(Integer.parseInt(request.getParameter("id")));
				user.setFirstName(request.getParameter("profile_first_name"));
				user.setLastName(request.getParameter("profile_last_name"));
				user.setGender(Gender.valueOf(request.getParameter("gender")));

				if (service.updateUserProfile(user)) {
					response.getWriter().write("success");
				} else {
					response.getWriter().write("failed");
				}

			} catch (ServiceException e) {
				ExceptionLoggerUtil.logException(e);
				response.sendError(CUST0M_STATUS_CODE, e.getMessage());
			}
		}

		if (action.equals("logout")) {

			// Get the user's session (if it exists)
			HttpSession session = request.getSession(false);

			if (session != null) {
				// Invalidate the session to log the user out
				session.invalidate();
				response.getWriter().write("success");
			} else {

				response.getWriter().write("failed");
			}
		}
	}

}