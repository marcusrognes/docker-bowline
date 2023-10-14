import {socketRequest} from "./lib/request";

import ListContainer from "./types/ListContainer";
import {Container} from "./types/Container";
import {CreateContainerProps, CreateContainerReturn} from "./types/CreateContainerProps";

export interface DockerProps {
	socket: string
}

export class Docker {
	private readonly socket: string;
	private readonly apiVersion: string = "v1.43";

	constructor(props: DockerProps) {
		this.socket = props.socket;
	}

	private call(method: string, path: string, body?: string) {
		return socketRequest(this.socket, "/" + this.apiVersion + "/" + path, method, body);
	}

	private async get(path: string) {
		return this.call("GET", path);
	}

	private async post(path: string, body?: string) {
		return this.call("POST", path, body);
	}

	private async delete(path: string) {
		return this.call("DELETE", path);
	}

	public async listContainers() {
		const response = await this.get("containers/json");

		return JSON.parse(response.data) as ListContainer[];
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerInspect
	public async inspectContainer(id: string) {
		const response = await this.get(`containers/${id}/json`);

		return JSON.parse(response.data) as Container;
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerCreate
	public async createContainer(name: string, props: CreateContainerProps, platform?: string) {
		const urlParamsInit = {name} as any;
		if (platform) urlParamsInit.platform = platform;

		const urlParams = new URLSearchParams(urlParamsInit);
		const response = await this.post(`containers/create?${urlParams.toString()}`, JSON.stringify(props));

		return JSON.parse(response.data) as CreateContainerReturn;
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerStart
	public async startContainer(id: string) {
		await this.post(`containers/${id}/start`);

		return true;
	}

	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerStop
	public async stopContainer(id: string) {
		await this.post(`containers/${id}/stop`);

		return true;
	}


	// @See: https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerDelete
	public async deleteContainer(id: string, props?: { v?: boolean, force?: boolean, link?: boolean }) {
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

		await this.delete(`containers/${id}${urlProps}`);

		return true;
	}
}
