#!/bin/sh
envsubst < /etc/angular/templates/config.json.template > /usr/share/nginx/html/assets/config/config.json
