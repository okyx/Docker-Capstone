sudo docker-compose up -d;
sleep 30;
sudo docker exec -it js-docker npm run migrate up;
