import {Socket} from "./lib/Socket";
import {Containers} from "./modules/Containers";
import {Images} from "./modules/Images";

export interface DockerProps {
	socket: string
	apiVersion?: string
}

export class Docker {
	private readonly socket: Socket;
	public readonly containers: Containers;
	public readonly images: Images;

	constructor(props: DockerProps) {
		this.socket = new Socket({
			...props
		});

		this.containers = new Containers(this.socket);
		this.images = new Images(this.socket);
	}
}
