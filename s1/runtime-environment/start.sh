
#!/bin/bash

echo " Starting environment"
sudo docker compose up -d
sudo docker compose logs --follow
