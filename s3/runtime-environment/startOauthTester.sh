
#!/bin/bash

echo " Starting OAUTH TESTER"
sudo docker compose up -d s3-oauth-tester
sudo docker compose logs --follow s3-oauth-tester
