
#!/bin/bash

echo " Starting APP1"
sudo docker compose up -d s3-app1-react-docker
sudo docker compose logs --follow s3-app1-react-docker
