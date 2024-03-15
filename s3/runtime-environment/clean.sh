#!/bin/bash

echo " Clean dangling containers ..."
sudo docker rmi $(docker images --filter "dangling=true" -q --no-trunc)