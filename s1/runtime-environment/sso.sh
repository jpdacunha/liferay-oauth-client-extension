

#!/bin/bash

#
# Author : jpdacunha 
#

RED=`tput setaf 1`
GREEN=`tput setaf 2`
BOLD=$(tput bold)
NC=`tput sgr0`

realmName="portal-realm"
keycloakContainerName="s1-sso"
fileExportName="portal-realm.json"

#
# Start Keycloak server. And monitor status over the time.
#
function start() {

	if [ "$(whoami)" = "root" ]
	then
	    echo "Error : This script cannot be executed as root user"	
	    exit 0
	fi
	
	echo "#"
	echo "# - Starting SSO (ctrl+z to exit) ..."
	echo "#"
	echo " "
	
	ADMIN_PROTOCOL="http"
	ADMIN_FQDN="sso.dev.local:8080"
	
	#Executing standard stop command
	sudo docker compose up -d --force-recreate $keycloakContainerName &>/dev/null
	
	TIMER=0
	echo " SSO serveur is starting (Elapsed time $TIMER sec) !"
	while [ $TIMER -lt 200 ]
	do	
			
		UP=`curl --max-time 8 --insecure --stderr - $ADMIN_PROTOCOL://$ADMIN_FQDN/health/ready | grep UP | wc -l`
		if [ $UP -ge 1 ]
		then	
			echo " SSO serveur started and ${GREEN}READY${NC}."
			exit 0
		fi	
		
		DOWN=`curl --max-time 8 --insecure --stderr - $ADMIN_PROTOCOL://$ADMIN_FQDN/health/ready | grep DOWN | wc -l`
		if [ $DOWN -ge 1 ]
		then	
			echo " SSO serveur started but is ${RED}NOT READY${NC}. Please check Keycloak installation"
			exit 0
		fi	
		
    	sleep 10
		TIMER=`expr $TIMER + 10`
    	echo " SSO serveur is starting (Elapsed time $TIMER sec) !"
    				
	done	
	
	echo " Maximum execution time elapsed. Please check your server status manually."
	exit 0	

	
}

function stop() {

	echo "#"
	echo "# - Shutting down SSO (ctrl+z to exit) ..."
	echo "#"
	echo " "
		
	sudo docker compose stop s1-sso	
	
}

function log() {

	if [ $( sudo docker ps -a | grep keycloak | wc -l ) -gt 0 ]; then

		echo "Found running container"
		sudo docker compose logs --follow $keycloakContainerName
	  
	else
		echo "${RED} Error : No running container was found${NC}"
	fi

}

function export() {

	if [ $( sudo docker ps -a | grep keycloak | wc -l ) -gt 0 ]; then

		echo "Found running container"
		initCommand="/opt/keycloak/bin/kc.sh export --file /opt/keycloak/exports/$fileExportName --realm $realmName"
	  	sudo docker exec $keycloakContainerName $initCommand

		echo "Replacing actual configuration"
	  	mv -f ./keycloak/exports/*.json ./keycloak/config/
	  
	else
		echo "${RED} Error : No running container was found${NC}"
	fi
	
}

function help() {

	echo "##"
	echo "# Usage: sso.sh"
	echo "##"
	echo " "
	echo " -- ADMINISTRATION -- "	
	echo "  stop              : Stop SSO server."
	echo "  start             : Start SSO server."
	echo "  log               : See SSO container logs"
	echo "  export            : Export the realm and all users in json file"	
	echo " "
}

if [ "$(whoami)" = "root" ]
then
    echo "${RED} Error : This script cannot be executed as root user${NC}"	
    exit 0
fi

if [ $# -eq 0 ]; then
    help
    exit 0
fi

case "$1" in
"stop")
	stop "$@"
	;;
"start")
	start "$@"
	;;
"log")
	log "$@"
	;;
"export")
	export "$@"
	;;
*)
    help
    ;;
esac

