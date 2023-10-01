#!/bin/env sh
docker run $(docker build -q -f .fedora/playwright.Dockerfile .)
