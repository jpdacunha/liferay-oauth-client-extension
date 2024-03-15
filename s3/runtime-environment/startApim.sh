
#!/bin/bash

echo " Starting Apim"
sudo docker compose up -d s3-apim
sudo docker compose logs --follow s3-apim
