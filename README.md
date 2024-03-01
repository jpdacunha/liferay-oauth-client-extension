# oAuth integration using Liferay's client extensions
Client extension oAuth integration demonstrator. This demonstrator is based on https://github.com/fabian-bouche-liferay/client-extensions-react-bff from Fabian Bouché

The aim of this project is to illustrate several scenarios available to perform OAuth integration inside Liferay using client extensions.

SPA apps integrated in Liferay using front-end client extension (micro front-end) using back-end services protected by external APIM.


There is several solution available to us :

| Solution     | Title   | Links |
| --------     | ------- | -------                                                      |
| S1           | Unique domain                    | [Voir la page dédiée](./s1/README.md) |
| S2           | Unique domain using web proxy    | [Voir la page dédiée](./s2/README.md) |
| S3           | APIM validating token in Liferay | [Voir la page dédiée](./s3/README.md) |
| S4           | Back End for Fron-end            | [Voir la page dédiée](./s4/README.md) |

* Solution 01 : Using same domain for both 


## Configure service access policy to create a new OAuth 2.0 scope

Creation of available scopes remain a manual operation

In Liferay Control Panel, go to Service Access Policy and hit the + button to create a new Service Accee Policy.

For the name: OAUTH2_httpbin.read

The OAUTH2_ prefix is used to register new scopes in Liferay.

Check Enabled

For the title: Make requests against https://httpbin.org/get

Hit Save.
