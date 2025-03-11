import React from "react";
import "../css/Footer.css"

function Footer() {
    return(
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">terms and conditions</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">licences</a></li>
                            <li><a href="#">plans</a></li>
                            <li><a href="#">other services</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>our goals</h4>
                        <ul>
                            <li><a href="#">Organize</a></li>
                            <li><a href="#">Emphasize</a></li>
                            <li><a href="#">free your time</a></li>
                            <li><a href="#">Organize</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
  	 		        </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;