# Requires build context to the be the root
#
# Build command from the root:
# docker build -f container-with-validation/Dockerfile .
#
# Make sure to change the base dir if needed for the copy commands.
FROM nginx:1.21.6-alpine

USER root

# Replace the GNU envsubst with a more extensive binary; this will also influence how nginx templates are rendered
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o envsubst
RUN chmod +x envsubst
RUN mv envsubst /usr/local/bin

# Our template for the configuration. You can add more but need to adjust the 50-writeConfig.sh
COPY container-with-validation/config.json.template /etc/angular/templates/

# Additional validation for environment variables
COPY container-with-validation/40-validateEnv.sh /docker-entrypoint.d/

# Our script which will place our environment variables in the template. The prefix 50 controls the order of execution
# and our script will be run last (there are three nginx scripts otherwise)
COPY container-with-validation/50-writeConfig.sh /docker-entrypoint.d/


# Copying our build angular application into the folder from which it will be served by nginx
# Make sure to change the first part to fit your output folder
COPY dist/configurable-angular-inside-docker /usr/share/nginx/html/

# Making it possible to run nginx as user nginx
RUN chown -R nginx /var/run /run /var/cache /var/cache/nginx
# Making possible to run the scripts in the /docker-entrypoint.d/ folder which use templates; including our template
RUN chown -R nginx /etc/nginx /etc/angular
# Making is possible to place our template file in the needed location
RUN chown -R nginx /usr/share/nginx/html

# Make our own custom scripts runnable
RUN chmod +x /docker-entrypoint.d/40-validateEnv.sh
RUN chmod +x /docker-entrypoint.d/50-writeConfig.sh

USER nginx
