import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import CookieConsent from "react-cookie-consent";

class GoogleAnalytics extends Component {
  initGA = () => {
    ReactGA.initialize(this.props.code, { anonymizeIp: true });
    ReactGA.pageview(this.props.page);
  };

  componentWillMount() {
    this.initGA();
  }

  render() {
    const regionRequired = "europe";
    const timeZone = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.toLowerCase();
    if (timeZone.indexOf(regionRequired) !== -1) {
      var gdprRequired = true;
    }
    gdprRequired = false;

    return gdprRequired ? (
      <CookieConsent
        buttonText="Ok"
        buttonClasses="cookie-btn"
        disableStyles
        cookieName="GoogleAnalytics"
        onAccept={() => {
          console.log("Google Analytics accepted");
        }}
      >
        <p className="cookie-text">
          We use cookies to ensure that we give you the best experience on our
          website. <Link to="/privacy">Privacy Policy</Link>
        </p>
      </CookieConsent>
    ) : (
      this.initGA
    );
  }
}

export default GoogleAnalytics;
