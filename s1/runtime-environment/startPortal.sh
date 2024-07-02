
#!/bin/bash

echo " Starting Portal"
sudo docker compose up -d s1-liferay
sudo docker compose logs --follow s1-liferay
