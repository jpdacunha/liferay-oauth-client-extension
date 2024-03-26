
#!/bin/bash

echo " Rebuild APP1"
./stopApp2.sh
./build.sh
./startApp2.sh
