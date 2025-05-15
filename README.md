### Test docker build

First, make sure you first excecute `docker-compose up -d` to start a local postgres db engine.

Make sure you have `DATABASE_URI=postgres://wetlands-db:wetlands-db@host.docker.internal:5432/wetlands-db` inside the `.env` file.

Then, use the following command to test the docker build locally:

```sh
docker buildx build --platform=linux/amd64 -t wetlands . && docker rm -f wetlands-container && docker run -d --name wetlands-container -p 80:80 wetlands
```
