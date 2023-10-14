import {Docker} from '../src';

async function test() {
	const docker = new Docker({socket: "//./pipe/docker_engine"});

	// Create container won`t auto pull a missing container.
	await docker.images.pull("hello-world:latest");

	const container = await docker.containers.create(
		"test-hello-world",
		{
			Image: "hello-world"
		}
	);

	console.log(`${container.Id} created`);

	await docker.containers.start(container.Id);

	console.log(`${container.Id} started`);

	const inspectContainerResponse = await docker.containers.inspect(container.Id);

	console.log(inspectContainerResponse);

	// Catch, hello-world container auto stops
	await docker.containers.stop(container.Id).catch(() => {
	});

	console.log(`${container.Id} stoped`);

	await docker.containers.delete(container.Id);

	console.log(`${container.Id} deleted`);

	const containers = await docker.containers.list();

	console.log(containers);
}

test().then(() => console.log("Done")).catch(error => console.error(error));
