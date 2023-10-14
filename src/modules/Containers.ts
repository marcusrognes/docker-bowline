import {Socket} from "../lib/Socket";
import ListContainer from "../types/ListContainer";
import {Container, CreateContainerProps, CreateContainerReturn} from "../types";


export class Containers {
	private readonly socket: Socket;

	constructor(socket: Socket) {
		this.socket = socket;
	}

	public async list() {
		const response = await this.socket.get("containers/json");

		return JSON.parse(response.data) as ListContainer[];
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerInspect
	public async inspect(id: string) {
		const response = await this.socket.get(`containers/${id}/json`);

		return JSON.parse(response.data) as Container;
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerCreate
	public async create(name: string, props: CreateContainerProps, platform?: string) {
		const urlParamsInit = {name} as any;
		if (platform) urlParamsInit.platform = platform;

		const urlParams = new URLSearchParams(urlParamsInit);
		const response = await this.socket.post(`containers/create?${urlParams.toString()}`, JSON.stringify(props));

		return JSON.parse(response.data) as CreateContainerReturn;
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerStart
	public async start(id: string) {
		await this.socket.post(`containers/${id}/start`);

		return true;
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerStop
	public async stop(id: string) {
		await this.socket.post(`containers/${id}/stop`);

		return true;
	}


	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerDelete
	public async delete(id: string, props?: { v?: boolean, force?: boolean, link?: boolean }) {
		let urlProps = "";

		if (props) {
			let urlParamProps = {} as { [key: string]: string };
			Object.keys(props).forEach((key) => {
				// @ts-ignore
				if (props[key]) urlParamProps[key] = "true";
			});
			const urlParams = new URLSearchParams(urlParamProps);
			urlProps = "?" + urlParams.toString();
		}

		await this.socket.delete(`containers/${id}${urlProps}`);

		return true;
	}
}


