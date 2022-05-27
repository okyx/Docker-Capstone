#!/bin/bash
INPUT="$1"

if [[ "$INPUT" == "mongo" ]];then
  sudo docker-compose -f docker-compose-mongo.yml up -d
  echo berjalan di server 0.0.0.0:5000;
elif [[ "$INPUT" == "postgres" ]];then
  sudo docker-compose up -d;
  sleep 30;
  sudo docker exec -it js-docker npm run migrate up;
  echo berjalan di server 0.0.0.0:5000;
fi
