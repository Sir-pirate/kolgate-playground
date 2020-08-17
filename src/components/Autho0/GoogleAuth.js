import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "35729443666-teiio5n42sr91viqbipavts334jc4u3i.apps.googleusercontent.com",
          scope: "email", // and whatever else passed as a string...
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.handleAuthChange();
          this.auth.isSignedIn.listen(this.handleAuthChange);
          console.log();
        });
    });
  }

  handleAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  handleSignIn = () => {
    this.auth.signIn();
  };

  handleSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return <button onClick={this.handleSignOut}>Sign Out</button>;
    } else {
      return <button onClick={this.handleSignIn}>Sign in with Google</button>;
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
