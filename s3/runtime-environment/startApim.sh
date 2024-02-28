
#!/bin/bash

echo " Starting Apim"
sudo docker compose up -d S3apim
sudo docker compose logs --follow S3apim
