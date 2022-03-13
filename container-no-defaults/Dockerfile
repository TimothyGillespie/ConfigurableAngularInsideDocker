# Requires build context to the be the root
#
# Build command from the root:
# docker build -f container-no-defaults/Dockerfile .
#
# Make sure to change the base dir if needed for the copy commands.
FROM nginx:1.21.6-alpine

USER root

# Our template for the configuration. You can add more but need to adjust the 40-writeConfig.sh
COPY container-no-defaults/config.json.template /etc/angular/templates/

# Our script which will place our environment variables in the template. The prefix 40 controls the order of execution
# and our script will be run last (there are three nginx scripts otherwise)
COPY container-no-defaults/40-writeConfig.sh /docker-entrypoint.d/

# Copying our build angular application into the folder from which it will be served by nginx
# Make sure to change the first part to fit your output folder
COPY dist/configurable-angular-inside-docker /usr/share/nginx/html/

# Making it possible to run nginx as user nginx
RUN chown -R nginx /var/run /run /var/cache /var/cache/nginx
# Making possible to run the scripts in the /docker-entrypoint.d/ folder which use templates; including our template
RUN chown -R nginx /etc/nginx /etc/angular
# Making is possible to place our template file in the needed location
RUN chown -R nginx /usr/share/nginx/html

# Make our own custom script runnable
RUN chmod +x /docker-entrypoint.d/40-writeConfig.sh

USER nginx


