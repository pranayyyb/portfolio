#!/bin/sh
# Publishes the built site to the gh-pages branch, which GitHub Pages serves at
# https://pranayyyb.github.io/portfolio/. Run `npm run deploy` after pushing changes to main.
set -e
npm run build
cd dist
touch .nojekyll # serve files as-is, no Jekyll processing
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="Pranay Bathija" -c user.email="pranay.bathija25@gmail.com" commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
git push -q -f "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
echo "Deployed. Live in a minute or two at https://pranayyyb.github.io/portfolio/"
