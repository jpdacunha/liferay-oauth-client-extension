# Solution 03 : APIM validating OAuth token in Liferay

- Web component: utilizes the Liferay object Liferay.OAuth2Client.FromUserAgentApplication(custom scope).
- Liferay OAuth2 client acts as an intermediary.
- More precisely: an external client of type oAuthApplicationUserAgent on the custom scope.
- In the Liferay admin, under Service Access policies, creating OAUTH2_(custom scope) allows creating a scope without additional development.
- The condition is that the API manager validates the token with Liferay, using this scope. This effectively enables "forwarding" to a backend service with a different domain name.
- Note: to achieve this, the token is temporarily stored in session storage.

```mermaid
sequenceDiagram
    autonumber
    actor Bob's browser
    Bob's browser->>+Liferay DXP: Access home page
    Liferay DXP-->>-Bob's browser: Return portal page
    Bob's browser->>+App container: Starting loading SPA
    App container-->>-Bob's browser: Returning SPA statics (js,css)
    App container->>+Liferay DXP: Negociating Oauth2 token
    Note right of Liferay DXP: Authorization Code Flow <br/>using configured OAuth App in Liferay
    Liferay DXP-->>-App container: Access Token
    App container->>+APIM: Requesting API call using token
    APIM->>+Liferay DXP: Request validation of Access Token
    Liferay DXP-->>-APIM: Token valid
    APIM->>+Back End Service : Forwarding API call
    Back End Service-->>-Bob's browser: Returning datas to browser
```

## Setup

### Configure /etc/hosts
You need to properly configure hostnames to make this setup working as expected
See [/etc/hosts configuration](../README.md)

### Build stack
```shell
$ cd ./runtime-environment
$ ./build.sh
```

### Deploy
```shell
$ cd ./runtime-environment
$ ./deploy.sh
```

### Starting stack
```shell
$ cd ./runtime-environment
$ ./start.sh
```
### Manual actions

#### Configure Virtual instance host

 Using control panel configure company's virtual instance following screenshot below

![Virtual Host](./images/virtual-host.png "Virtual Host configuration")

#### Configure service access policy to create a new OAuth 2.0 scope

Creation of available scopes remain a manual operation

In Liferay Control Panel, go to Service Access Policy and hit the + button to create a new Service Access Policy.

For the name: **OAUTH2_apim.httpbin.mock.read**

The OAUTH2_ prefix is used to register new scopes in Liferay.

Check Enabled

For the title: Make requests against https://httpbin.org/get

Hit Save.

Repeat operation for **OAUTH2_apim.communes.read**

#### Update clientId and secret in front-end app
Using control panel :
1. Generate secret for configured client
![Generate secret](./images/oauth2.0-secret.png "Generate secret")

2. Copy clientId
![ClientId](./images/oauth2.0-clientId.png "ClientId")

3. Update APP1 
Update Oauth 2.O App1 configuration : 
    a. Edit ./front-end/app1/src/services/ApimClient.js
    b. At the top of the class update json with clientId and secret 

4. reBuild APP1
```shell
$ cd ./runtime-environment
$ ./rebuildApp1.sh
```

####  Pages creation
Create page for app1 :
1. Create page app1
2. Under Remote Apps section drop App1 on the page

Create page for app2 :
1. Create page app2
2. Under Remote Apps section drop App2 on the page

####  Update callback URLs
Update callback URL according to create pages :
![CCallback URI](./images/oauth2.0-callbackuri.png "Callback URI")

## Utils

### 1. Exposed services

#### 1. APIM

| Service             | Title   | Links |
| --------         | ------- | -------                                                        |
| Cities           | https://apim.dev.local:8443/cities      | Returned the headers of original request has a response |
| Debug            | http://apim.dev.local:8800/debug/get    | Returned all french cities using the public french government API |

#### 2. PORTAL

| Service             | Title   | Links |
| --------         | ------- | -------                                                        |
| Liferay           | https://portal.dev.local:8080      | URL of Liferay portal |


#### 3. APPS


| Service             | Title   | Links |
| --------         | ------- | -------                                                        |
| APP1             | https://app1.dev.local:3000     | URL of first app declared has client extension on Liferay |
| APP2             | https://app2.dev.local:3000     | URL of second app declared has client extension on Liferay |

## Troubleshooting