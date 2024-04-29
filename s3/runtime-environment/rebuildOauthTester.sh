
#!/bin/bash

echo " Rebuild OAUTH TESTER"
./stopOauthTester.sh
./build.sh
./startOauthTester.sh
