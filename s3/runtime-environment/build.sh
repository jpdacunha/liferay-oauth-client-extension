#!/bin/bash

echo " Building all containers ..."
sudo docker compose build

echo " Building Liferay workspace plugins ..."
cd ../liferay-workspace/
./gradlew deploy