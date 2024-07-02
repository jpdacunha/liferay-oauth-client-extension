
#!/bin/bash

echo " Starting Portal"
sudo docker compose up -d s3-liferay
sudo docker compose logs --follow s3-liferay
