#!/bin/bash

# npm packages that need do be installed as globals to run as cli
declare -a npm_globals=('knex');

# First install all packages from package.json
printf "======== Installing npm packages ======== \n"
npm install;
printf "======== Finished installing npm packages ========\n\n"

# Then install global packages as necessary
printf "======== Installing certain packages as globals ========\n"
for pkg in ${npm_globals[@]}; do
  npm install -g $pkg
done
printf "======== Finished installing global packages ========\n\n"

# Now migrate database to latest
printf "======== Migrating database to latest version ========\n"
knex migrate:latest --knexfile ./backend/knexfile.js --cwd .
printf "======== Finished migration ========\n"
