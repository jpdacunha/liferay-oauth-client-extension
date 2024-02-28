
#!/bin/bash

echo " Starting Liferay server"
sudo docker compose up -d liferay7413u112
sudo docker compose logs --follow liferay7413u112
