import {socketRequest} from "./request";

export interface CallerProps {
	socket: string
	apiVersion?: string
}

export class Socket {
	private readonly socket: string;
	private readonly apiVersion: string = "v1.43";

	constructor(props: CallerProps) {
		this.socket = props.socket;
		this.apiVersion = props.apiVersion || "v1.43";
	}

	private call(method: string, path: string, body?: string) {
		return socketRequest(this.socket, "/" + this.apiVersion + "/" + path, method, body);
	}

	public async get(path: string) {
		return this.call("GET", path);
	}

	public async post(path: string, body?: string) {
		return this.call("POST", path, body);
	}

	public async delete(path: string) {
		return this.call("DELETE", path);
	}
}


