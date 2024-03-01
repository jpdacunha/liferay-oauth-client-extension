
#!/bin/bash

echo " Starting APP1"
sudo docker compose up -d app1
sudo docker compose logs --follow app1
