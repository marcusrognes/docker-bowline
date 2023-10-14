import {HostConfig, Mount, NetworkSettings, Port} from "./Container";

export default interface ListContainer {
	Id: string;
	Names: string[];
	Image: string;
	ImageID: string;
	Command: string;
	Created: number;
	Ports: Port[];
	Labels: { [key: string]: string };
	State: string;
	Status: string;
	HostConfig: HostConfig;
	NetworkSettings: NetworkSettings;
	Mounts: Mount[];
}
