# oAuth integration using Liferay's client extensions
Client extension oAuth integration demonstrator. This demonstrator is based on https://github.com/fabian-bouche-liferay/client-extensions-react-bff from Fabian Bouché

The aim of this project is to illustrate several scenarios available to perform OAuth integration inside Liferay using client extensions.

**CONTEXT** : SPA apps integrated in Liferay using front-end client extension (micro front-end) using back-end services protected by external APIM.


There is several solution available to us :

| Solution     | Title   | Links |
| --------     | ------- | -------                                                        |
| S1           | Unique domain                    | [Further information](./s1/README.md) |
| S2           | Unique domain using web proxy    | [Further information](./s2/README.md) |
| S3           | APIM validating token in Liferay | [Further information](./s3/README.md) |
| S4           | Back End for Fron-end            | [Further information](./s4/README.md) |

## Initial Setup

This demonstrator was initialiy designed to run on Liferay SaaS. In order to make it available on a local environment please follow this steprs 

### Setup /etc/hosts

Edit your system /etc/hosts and insert this lines. This setup simulate different domains.

```console
127.0.0.1       portal.dev.local
127.0.0.1       apim.dev.local
127.0.0.1       app1.dev.local
127.0.0.1       app2.dev.local
```

#References

* [Automatically deploy client extension as remote apps in Liferay]( https://liferay.dev/blogs/-/blogs/-front-end-client-extension-how-to-automate-deployments-for-remote-apps-in-on-premises)

* [Reference resources as absolute path in ReactJS](https://dev.to/hidaytrahman/absolute-path-in-react-125h)



# TODO
- Modify APP to retrieve APIM URL from Liferay replace hard coded URL
- Modify app to make a back-end call (working inside liferay and signed in only)
- Generate token for the right scope (at this time scope field is empty for bearer token)
- Make app working outside Liferay using Axios instead of Liferay OOTB client
- Verifyin token in APIM side -> Check that APIM reject calls if no token is passed (the App will not work anymore outside Liferay)

# TO SOLVE :
- Automatic deployement ./gradlew deploy
- Update Liferay Virtual Host Value automatically (Chexk if runing SQL scripts is possible in H2 container instead of Liferay)