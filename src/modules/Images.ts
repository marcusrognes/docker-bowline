import {Socket} from "../lib/Socket";
import ListContainer from "../types/ListContainer";
import {Container, CreateContainerProps, CreateContainerReturn} from "../types";


export class Images {
	private readonly socket: Socket;

	constructor(socket: Socket) {
		this.socket = socket;
	}

	public async pull(image: string) {
		await this.socket.post(`images/create?fromImage=${image}`);

		return true;
	}
}


