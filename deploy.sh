#!/bin/bash

GH_REPOSITORY="https://${GH_TOKEN}@github.com/inok6743/iitc-deploy.git"

if [ "${TRAVIS_BRANCH}" = "master" ]; then
    DEPLOY_DIR=files/release
else
    DEPLOY_DIR=files/develop
fi

git clone "${GH_REPOSITORY}" deploy_target

./build.py local
cp -f ./build/local/*.user.js "./deploy_target/${DEPLOY_DIR}/"
cp -f ./build/local/plugins/*.user.js "./deploy_target/${DEPLOY_DIR}/"

echo "key.store=release.keystore"        >> ./mobile/build.properties
echo "key.store.password=${KEYSTORE_PW}" >> ./mobile/build.properties
echo "key.alias=mykey"                   >> ./mobile/build.properties
echo "key.alias.password=${KEYSTORE_PW}" >> ./mobile/build.properties
android update project -p ./mobile/
./build.py mobile
cp -f ./build/mobile/*.apk "./deploy_target/${DEPLOY_DIR}/"

ls -l "./deploy_target/${DEPLOY_DIR}/"
cd ./deploy_target/
git config --global user.email "inok6743@gmail.com"
git config --global user.name "Travis CI (Automatic Commit)"
git add "./files/*.user.js"
git add "./files/*.apk"
git commit -m "IITC: Automatic deploy from Travis-CI (#${TRAVIS_BUILD_NUMBER})"
git push "${GH_REPOSITORY}" master:master
