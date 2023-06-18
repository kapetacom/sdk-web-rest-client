type RequestArgumentTransport = 'path' | 'header' | 'body' | 'query' | 'PATH' | 'HEADER' | 'BODY' | 'QUERY'
type RequestMethod =
    | 'GET'
    | 'POST'
    | 'DELETE'
    | 'PATCH'
    | 'PUT'
    | 'OPTIONS'
    | 'HEAD'
    | 'TRACE'
    | 'CONNECT'
    | 'LINK'
    | 'UNLINK'
    | 'COPY'
    | 'PURGE'
    | 'LOCK'
    | 'UNLOCK'
    | 'PROPFIND'
    | 'VIEW';
export interface RequestArgument {
    name: string;
    value: any;
    transport: RequestArgumentTransport;
}

export class RestError extends Error {
    public readonly response: Response;
    public readonly statusCode: number;

    constructor(error:string, response: Response) {
        super(error);
        this.response = response;
        this.statusCode = response.status;

    }

}

export class RestClient {
    private readonly _baseUrl: string;

    /**
     * Initialise rest client
     *
     * @param {string} baseUrl
     */
    constructor(baseUrl: string) {
        if (!baseUrl) {
            baseUrl = '/';
        }

        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }

        this._baseUrl = baseUrl;
    }

    /**
     *
     * @param {string} method
     * @param {string} path
     * @param {RequestArgument[]} requestArguments
     * @return {Promise<Object>}
     */
    async execute(method: RequestMethod, path: string, requestArguments: RequestArgument[] = []) {
        while (path.startsWith('/')) {
            path = path.substring(1);
        }

        let url = this._baseUrl + path;

        const query: string[] = [];
        const headers: { [key: string]: string } = {
            accept: 'application/json',
        };
        const opts: RequestInit = {
            method,
            headers,
        };

        requestArguments.forEach((requestArgument) => {
            switch (requestArgument.transport.toLowerCase()) {
                case 'path':
                    url = url.replaceAll('{' + requestArgument.name + '}', requestArgument.value);
                    break;
                case 'header':
                    headers[requestArgument.name] = requestArgument.value;
                    break;
                case 'body':
                    if (!headers['content-type']) {
                        headers['content-type'] = 'application/json';
                    }
                    opts.body = JSON.stringify(requestArgument.value);
                    break;
                case 'query':
                    query.push(
                        encodeURIComponent(requestArgument.name) + '=' + encodeURIComponent(requestArgument.value)
                    );
                    break;
                default:
                    throw new Error('Unknown argument transport: ' + requestArgument.transport);
            }
        });

        if (query.length > 0) {
            url += '?' + query.join('&');
        }

        const result = await fetch(url, opts);

        if (result.status === 404) {
            return null;
        }
        const jsonResult = await result.json();
        if (result.status >= 400) {
            let error = jsonResult.error ?? 'Unknown error';
            throw new RestError(error, result);
        }

        return jsonResult;
    }
}