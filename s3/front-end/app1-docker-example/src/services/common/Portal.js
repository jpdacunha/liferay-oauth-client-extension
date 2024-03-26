export const Portal = window.Liferay || {

	OAuth2: {
		getAuthorizeURL: () => '',
		getBuiltInRedirectURL: () => '',
		getIntrospectURL: () => '',
		getTokenURL: () => '',
		getUserAgentApplication: (_serviceName) => {},
	},
	OAuth2Client: {
		FromParameters: (_options) => {
			return {};
		},
		FromUserAgentApplication: (_userAgentApplicationId) => {
			return {
				"authorizeURL": "http://portal.dev.local:8080/o/oauth2/authorize",
				"clientId": "id-6fb14480-a7c3-3d16-f828-a93d7bfadd2",
				"encodedRedirectURL": "http%3A%2F%2Fportal.dev.local%3A8080%2Fo%2Foauth2%2Fredirect",
				"homePageURL": "http://apim.dev.local:8800",
				"redirectURIs": [
				  "http://portal.dev.local:8080/o/oauth2/redirect"
				],
				"tokenURL": "http://portal.dev.local:8080/o/oauth2/token"
			};
		},
		fetch: (_url, _options = {}) => {},
	},
	ThemeDisplay: {
		getCompanyGroupId: () => 0,
		getScopeGroupId: () => 0,
		getSiteGroupId: () => 0,
		isSignedIn: () => {
			return false;
		},
	},
	authToken: '',
	
};