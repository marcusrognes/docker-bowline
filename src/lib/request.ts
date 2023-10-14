import http from "http";

export function socketRequest(socketPath: string, path: string, method: string, body?: string): Promise<{ res: http.IncomingMessage, data: string }> {
	return new Promise((resolve, reject) => {
		const clientRequest = http.request({
			socketPath,
			path: path,
			method,
			headers: {
				"content-type": "application/json"
			}
		}, res => {
			let handled = false;
			res.setEncoding('utf8');

			res.on('data', data => {
				handled = true;
				if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
					resolve({res, data: data.trim()})
				} else {
					reject(new Error(res.statusMessage || "Unknown error"));
				}
			});
			res.on('error', error => {
				handled = true;
				reject(error);
			});
			res.on("end", () => {
				if (handled) return;

				if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
					resolve({res, data: "{}"})
				} else {
					reject(new Error(res.statusMessage || "Unknown error"));
				}
			})
		});
		if (body) clientRequest.write(body);
		clientRequest.end();
	});
}

