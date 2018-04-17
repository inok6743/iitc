#!/bin/bash

if [ "${TRAVIS_BRANCH}" = "master" ]; then
    DEPLOY_DIR=iitc/release
else
    DEPLOY_DIR=iitc/development
fi

git clone https://github.com/inok6743/enl-tottori-web.git deploy_target

./build.py local
cp -f ./build/local/*.user.js "./deploy_target/${DEPLOY_DIR}/"
cp -f ./build/local/plugins/*.user.js "./deploy_target/${DEPLOY_DIR}/"

android update project -p ./mobile/
./build.py mobile
cp -f ./build/mobile/*.apk "./deploy_target/${DEPLOY_DIR}/"

cd ./deploy_target/
git config --global user.email 'inok6743@gmail.com'
git config --global user.name 'Travis CI (Automatic Commit)'
git add './iitc/*.user.js'
git commit -m "IITC: Automatic deploy from Travis-CI (#${TRAVIS_BUILD_NUMBER})"
git push "https://${GH_TOKEN}@github.com/enl-tottori/enl-tottori-web.git" master:master
