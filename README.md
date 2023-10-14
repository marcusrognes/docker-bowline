# docker-bowline

A simple library for sending requests to docker engine over sockets.

## Disclaimer

This library only includes the aspects of docker engine that I have needed for my projects.

## Getting started

### Install

```bash
npm i docker-bowline
```

### Setup

```typescript
import {Docker} from 'docker-bowline';


const windowsSocket = new Docker({
	socket: "//./pipe/docker_engine"
});

const unixSocket = new Docker({
	socket: "/var/run/docker.sock"
});
```

### Basic usage

````typescript

// Pull image
await docker.images.pull("mongo:latest");

// Create container
await docker.containers.create(
	"test-mongo",
	{
		Image: "mongo"
	}
);
````

