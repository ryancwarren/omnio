class OpenIDConnectProvider {
    issuerURL: string
    /**
     * The location where user's of the OpenIDConnect Provider (OP) are redirected for authorization.
     */
    authorizationEndpoint: string;


    /**
     * The location where user's exchange credentials for token IDs.  The type of Token (JWT, ...) isn't specified.
     */
    tokenEndpoint: string;

    userInfoEndpoint: string;

    /**
     * JSON Web Key Set (JWKS) document.
     */
    jwksUrl: string;


    /**
     * Dynamic client registration endpoint.  Not always supported...
     */
    registrationEndpoint: string;


    /**
     * List of available scopes that user's can request.  A scope is somewhat like a resource type or collection.
     */
    scopes: string[];


    responseTypesSupported: "code" | "id_token" | "token id_token" | undefined;


    constructor(issuerURL: string) {
        this.issuerURL = issuerURL;
        this.authorizationEndpoint = `${this.issuerURL}/authorize`;
        this.tokenEndpoint = `${this.issuerURL}/token`;
    }

    get discoveryDocument(): string {
        return `${this.issuerURL}/.well-known/openid-configuration`;
    }
}