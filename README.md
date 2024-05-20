# oAuth integration using Liferay's client extensions
Client extension oAuth integration demonstrator. This demonstrator is based on https://github.com/fabian-bouche-liferay/client-extensions-react-bff from Fabian Bouché

The aim of this project is to illustrate several scenarios available to perform OAuth integration inside Liferay using client extensions.

**CONTEXT** : SPA apps integrated in Liferay using front-end client extension (micro front-end) using back-end services protected by external APIM.

There is scenarions illustrated by the demonstrators :

| Scenario     | Title   | Links |
| --------     | ------- | -------                                                         |
| S1           | APIM validating token in keycloak | [Further information](./s1/README.md) |
| S2           | Unique domain using web proxy     | [Further information](./s2/README.md) |
| S3           | APIM validating token in Liferay  | [Further information](./s3/README.md) |
| S4           | Back End for Front-end            | [Further information](./s4/README.md) |

## Initial Setup

This demonstrator was initialiy designed to run on Liferay SaaS. In order to make it available on a local environment please follow this steps 

### Setup /etc/hosts

Edit your system /etc/hosts and insert this lines. This setup simulate different domains.

```console
127.0.0.1       portal.dev.local
127.0.0.1       apim.dev.local
127.0.0.1       app1.dev.local
127.0.0.1       app2.dev.local
127.0.0.1       tester.dev.local
127.0.0.1       sso.dev.local
```

#References

* [Automatically deploy client extension as remote apps in Liferay]( https://liferay.dev/blogs/-/blogs/-front-end-client-extension-how-to-automate-deployments-for-remote-apps-in-on-premises)

* [Reference resources as absolute path in ReactJS](https://dev.to/hidaytrahman/absolute-path-in-react-125h)
