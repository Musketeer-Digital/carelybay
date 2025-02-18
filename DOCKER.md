##Steps to Build and Run

Pull and run MongoDB in your machine

```
docker pull mongo
```

Run MongoDB

```
docker run -p 27017:27017 mongo
```

Create `.env` file to your laptop hostname in Docker network

For MacOS and Windows:

```
MONGODB_URL=mongodb://host.docker.internal:27017/carelybay
```

For Linux:

```
MONGODB_URL=mongodb://<LAN_IP_address>:27017/carelybay
```

Build the Docker Image:

```
docker build -t carelybay-frontend .
```

Run the Docker Container:

```
docker run -p 3000:3000 carelybay-frontend
```
