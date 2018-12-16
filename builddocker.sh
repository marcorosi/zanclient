#!/bin/sh

ng build --prod 

docker image build -t marcorosi/zanclient .