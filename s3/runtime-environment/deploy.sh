#!/bin/bash

echo " Deploying Liferay workspace plugins ..."

destination=./liferay-74/mount/deploy

widget_home=../liferay-workspace/build

IFS=$'\n'
for i in $(find $widget_home/* -name '*.zip' -not -path '*node_modules*'  );
do
    echo "Copying $i to $destination"		
    cp -f $i $destination

done
unset IFS