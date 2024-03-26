
#!/bin/bash

echo " Rebuild APP1"
./stopApp1.sh
./build.sh
./startApp1.sh
