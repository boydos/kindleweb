package com.ds.kindle;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import com.ds.kindle.utils.PlatformUtils;
import com.ds.utils.Log;

/**
 * Servlet implementation class InitWebServlet
 */
@WebServlet("/InitWebServlet")
public class InitWebServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static final String TAG="InitWebServlet";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InitWebServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
		Log.i(TAG, "destroy");
	}

	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		PlatformUtils.init();
		super.init();
	}

}
