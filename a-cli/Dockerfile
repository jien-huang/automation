FROM --platform=linux/x86_64 adoptopenjdk/openjdk11:jre-11.0.9_11.1-alpine
ARG git_url
ARG git_branch
ARG browser=chromium
ARG suite_name=cpt.yml
ARG results_url
ARG id
RUN apk update
RUN apk add git
RUN apk add curl
RUN apk add zip
RUN apk add chromium 
RUN apk add firefox
COPY build/libs/a-cli-*.jar /opt/a-cli.jar
COPY start.sh /opt/start.sh
CMD /bin/bash
#ENTRYPOINT ["/opt/start.sh -u $git_url -b $git_branch -B $browser -s $suite_name -i $id -r $results_url"]
