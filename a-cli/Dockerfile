
FROM --platform=linux/x86_64 adoptopenjdk/openjdk11:alpine-jre
#FROM adoptopenjdk/openjdk11:alpine-jre
ENV git_url = http://
ENV git_branch = main
ENV browser=chromium
ENV suite_name=cpt.yml
ENV results_url = http://localhost:8080/upload-file
ENV id=00001
RUN apk update
RUN apk add git curl zip chromium firefox
COPY build/libs/a-cli-*.jar /opt/a-cli.jar
COPY start.sh /opt/start.sh
#CMD /bin/bash
#ENTRYPOINT ["/opt/start.sh -u $git_url -b $git_branch -B $browser -s $suite_name -i $id -r $results_url"]
