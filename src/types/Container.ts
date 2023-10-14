export interface Container {
	Id: string;
	Created: Date;
	Path: string;
	Args: string[];
	State: State;
	Image: string;
	ResolvConfPath: string;
	HostnamePath: string;
	HostsPath: string;
	LogPath: string;
	Name: string;
	RestartCount: number;
	Driver: string;
	Platform: string;
	MountLabel: string;
	ProcessLabel: string;
	AppArmorProfile: string;
	ExecIDs: unknown;
	HostConfig: HostConfig;
	GraphDriver: GraphDriver;
	Mounts: Mount[];
	Config: Config;
	NetworkSettings: NetworkSettings;
}

export interface Config {
	Hostname: string;
	Domainname: string;
	User: string;
	AttachStdin: boolean;
	AttachStdout: boolean;
	AttachStderr: boolean;
	ExposedPorts: { [key: string]: Port };
	Tty: boolean;
	OpenStdin: boolean;
	StdinOnce: boolean;
	Env: string[];
	Cmd: string[];
	Image: string;
	Volumes: { [key: string]: Port };
	WorkingDir: string;
	Entrypoint: string[];
	OnBuild: unknown;
	Labels: { [key: string]: string };
}

export interface GraphDriver {
	Data: Data;
	Name: string;
}

export interface Data {
	LowerDir: string;
	MergedDir: string;
	UpperDir: string;
	WorkDir: string;
}

export interface HostConfig {
	Binds: string[];
	ContainerIDFile: string;
	LogConfig: LogConfig;
	NetworkMode: string;
	PortBindings: { [key: string]: Port };
	RestartPolicy: RestartPolicy;
	AutoRemove: boolean;
	VolumeDriver: string;
	VolumesFrom: unknown;
	ConsoleSize: number[];
	CapAdd: unknown;
	CapDrop: unknown;
	CgroupnsMode: string;
	Dns: any[];
	DnsOptions: any[];
	DnsSearch: any[];
	ExtraHosts: any[];
	GroupAdd: unknown;
	IpcMode: string;
	Cgroup: string;
	Links: unknown;
	OomScoreAdj: number;
	PidMode: string;
	Privileged: boolean;
	PublishAllPorts: boolean;
	ReadonlyRootfs: boolean;
	SecurityOpt: unknown;
	UTSMode: string;
	UsernsMode: string;
	ShmSize: number;
	Runtime: string;
	Isolation: string;
	CpuShares: number;
	Memory: number;
	NanoCpus: number;
	CgroupParent: string;
	BlkioWeight: number;
	BlkioWeightDevice: unknown;
	BlkioDeviceReadBps: unknown;
	BlkioDeviceWriteBps: unknown;
	BlkioDeviceReadIOps: unknown;
	BlkioDeviceWriteIOps: unknown;
	CpuPeriod: number;
	CpuQuota: number;
	CpuRealtimePeriod: number;
	CpuRealtimeRuntime: number;
	CpusetCpus: string;
	CpusetMems: string;
	Devices: unknown;
	DeviceCgroupRules: unknown;
	DeviceRequests: unknown;
	MemoryReservation: number;
	MemorySwap: number;
	MemorySwappiness: unknown;
	OomKillDisable: boolean;
	PidsLimit: unknown;
	Ulimits: unknown;
	CpuCount: number;
	CpuPercent: number;
	IOMaximumIOps: number;
	IOMaximumBandwidth: number;
	MaskedPaths: string[];
	ReadonlyPaths: string[];
}

export interface LogConfig {
	Type: string;
	Config: Port;
}

export interface Port {
	HostIp: string;
	HostPort: string;
	IP: string;
	PrivatePort: number;
	PublicPort: number;
	Type: string;
}

export interface RestartPolicy {
	Name: string;
	MaximumRetryCount: number;
}

export interface Mount {
	Type: string;
	Name?: string;
	Source: string;
	Destination: string;
	Driver?: string;
	Mode: string;
	RW: boolean;
	Propagation: string;
}

export interface NetworkSettings {
	Bridge: string;
	SandboxID: string;
	HairpinMode: boolean;
	LinkLocalIPv6Address: string;
	LinkLocalIPv6PrefixLen: number;
	Ports: Port;
	SandboxKey: string;
	SecondaryIPAddresses: unknown;
	SecondaryIPv6Addresses: unknown;
	EndpointID: string;
	Gateway: string;
	GlobalIPv6Address: string;
	GlobalIPv6PrefixLen: number;
	IPAddress: string;
	IPPrefixLen: number;
	IPv6Gateway: string;
	MacAddress: string;
	Networks: { [key: string]: DevDefault };
}

export interface DevDefault {
	IPAMConfig: IPAMConfig;
	Links: unknown;
	Aliases: string[];
	NetworkID: string;
	EndpointID: string;
	Gateway: string;
	IPAddress: string;
	IPPrefixLen: number;
	IPv6Gateway: string;
	GlobalIPv6Address: string;
	GlobalIPv6PrefixLen: number;
	MacAddress: string;
	DriverOpts: unknown;
}

export interface IPAMConfig {
	IPv4Address: string;
	IPv6Address: string;
	LinkLocalIPs: string[];
}

export interface State {
	Status: string;
	Running: boolean;
	Paused: boolean;
	Restarting: boolean;
	OOMKilled: boolean;
	Dead: boolean;
	Pid: number;
	ExitCode: number;
	Error: string;
	StartedAt: Date;
	FinishedAt: Date;
}
