
#!/bin/bash

echo " Starting APP1"
sudo docker compose up -d s3-app2
sudo docker compose logs --follow s3-app2
