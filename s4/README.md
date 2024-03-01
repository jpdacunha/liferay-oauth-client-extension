# Solution 02 : Back End for Front End

- Multiple services (e.g., Spring Boot), one per component (or per scope), are deployed on the same domain as Liferay.
- Each service is tasked with proxying the call to the target web service.
- Initial authentication flow => initial access token.
- Each web component calls its endpoint.
- Since it is on the same domain as Liferay, it receives its cookies, including the access token.
- However, this implies that the initial request is made for all scopes right from the start. (and, of course, that the web services can be proxied)
- Some similarities with the web proxy solution, but more targeted (and complex).
