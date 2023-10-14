import {HostConfig, IPAMConfig, Port} from "./Container";

export interface CreateContainerProps {
	Hostname?: string;
	Domainname?: string;
	User?: string;
	AttachStdin?: boolean;
	AttachStdout?: boolean;
	AttachStderr?: boolean;
	Tty?: boolean;
	OpenStdin?: boolean;
	StdinOnce?: boolean;
	Env?: string[];
	Cmd?: string[];
	Entrypoint?: string;
	Image?: string;
	Labels?: { [key: string]: string };
	Volumes?: { [key: string]: Port };
	WorkingDir?: string;
	NetworkDisabled?: boolean;
	MacAddress?: string;
	ExposedPorts?: { [key: string]: Port };
	StopSignal?: string;
	StopTimeout?: number;
	HostConfig?: HostConfig;
	NetworkingConfig?: NetworkingConfig;
}

export interface CreateContainerReturn {
	Id: string;
	Warnings: string[];
}


export interface NetworkingConfig {
	EndpointsConfig: EndpointsConfig;
}

export interface EndpointsConfig {
	isolated_nw: IsolatedNw;
}

export interface IsolatedNw {
	IPAMConfig: IPAMConfig;
	Links: string[];
	Aliases: string[];
}
