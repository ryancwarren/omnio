"use strict";
class OpenIDConnectProvider {
    constructor(issuerURL) {
        this.issuerURL = issuerURL;
        this.authorizationEndpoint = `${this.issuerURL}/authorize`;
        this.tokenEndpoint = `${this.issuerURL}/token`;
    }
    get discoveryDocument() {
        return `${this.issuerURL}/.well-known/openid-configuration`;
    }
}
