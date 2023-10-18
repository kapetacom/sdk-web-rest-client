type RequestArgumentTransport = 'path' | 'header' | 'body' | 'query' | 'PATH' | 'HEADER' | 'BODY' | 'QUERY';
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

    constructor(error: string, response: Response) {
        super(error);
        this.response = response;
        this.statusCode = response.status;
    }
}

//We want dates as numbers
const JSONStringifyReplacer = function(this:any, key:string, value:any) {
    if (this[key] instanceof Date) {
        return this[key].getTime();
    }
    return value;
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
     * Executes a request to the specified path using the specified method.
     *
     * @param {RequestMethod} method The HTTP method to use for the request.
     * @param {string} path The path of the resource to request.
     * @param {RequestArgument[]} requestArguments An array of request arguments.
     * @return {Promise<ReturnData | null>} The result of the request, or null if the response status is 404.
     */
    async execute<ReturnData = any>(method: RequestMethod, path: string, requestArguments: RequestArgument[] = []) {
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
                    opts.body = JSON.stringify(requestArgument.value, JSONStringifyReplacer);
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

        let output: ReturnData | null = null;
        if (result.headers.get('content-type')?.startsWith('application/json')) {
            //Only parse json if content-type is application/json
            const text = await result.text();
            output = text ? (JSON.parse(text) as ReturnData) : null;
        }

        if (result.status >= 400) {
            const error =
                output && typeof output === 'object' && 'error' in output && typeof output.error === 'string'
                    ? output.error
                    : 'Unknown error';
            throw new RestError(error, result);
        }

        return output;
    }
}
