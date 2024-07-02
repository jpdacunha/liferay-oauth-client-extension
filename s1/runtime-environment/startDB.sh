
#!/bin/bash

echo " Starting DB"
sudo docker compose up -d s1-db
sudo docker compose logs --follow s1-db
