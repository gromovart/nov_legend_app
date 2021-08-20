FROM node:14-buster-slim

RUN apt-get update -yqq \
  && apt-get upgrade -yqq \
  && apt-get autoremove -yqq --purge \
  && apt-get clean \
  && rm -rf \
  /var/lib/apt/lists/* \
  /tmp/* \
  /var/tmp/* \
  /usr/share/man \
  /usr/share/doc \
  /usr/share/doc-base

ARG WORKDIR=/usr/src/app/
WORKDIR ${WORKDIR}


