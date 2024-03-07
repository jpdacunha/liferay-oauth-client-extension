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
# TODO 
- Declare apps has client extension inside Liferay
- Modify app to make a back-end call
- Verifyin token in APIM side