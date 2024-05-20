# Solution 01 : Unique domain

- Imposing a single domain is a highly restrictive condition, yet relevant for SSO OIDC, OAuth2, or even SAML.
- Web Component 1 performs its full-page redirection to the provider. At the end of the tunnel, the user returns with their token.
- A micro-iframe can then be called for Web Component 2, which will benefit from this initial token (thanks to the single domain), without having to replay the authentication


https://www.aimprosoft.com/blog/liferay-sso-integration/
https://techblog.smc.it/en/2021-10-15/how-to-connect-keycloak-liferay-openid-connect
https://github.com/lgdd/liferay-keycloak-demo/tree/main