import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function Footer() {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start text-muted footer-main"
    >
      {/* Social media section */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        {/* Left side - text (hidden on small screens) */}
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        {/* Right side - social media icons */}
        <div>
          <a href="https://www.facebook.com" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="https://www.twitter.com" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="https://www.google.com" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="https://www.instagram.com" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="https://www.linkedin.com" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="https://www.github.com" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      {/* Footer content */}
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            {/* Company info */}
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </MDBCol>

            {/* Products */}
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>Xerox</p>
              <p>Color Print </p>
              <p>Online Application</p>
              <p>Thesis work </p>
              <p>Binding</p>
              <p>flex Designs & Cards Printing</p>
            </MDBCol>

            {/* Useful links */}
            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            {/* Contact */}
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                MD plaza R A college Read , Washim, 444505
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                theprintinghubwsm@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 9673866836
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Copyright */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className=" fw-bold">Arun Technologoies</a>
      </div>
    </MDBFooter>
  );
}
