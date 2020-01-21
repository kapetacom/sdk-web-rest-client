class RestClient {

    /**
     * Initialise rest client
     *
     * @param {string} baseUrl
     */
    constructor(baseUrl) {
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
    async execute(method, path, requestArguments) {

        while (path.startsWith('/')) {
            path = path.substr(1)
        }

        let url = this._baseUrl + path;

        const query = [];
        const opts = {
            method,
            headers: {},
        };

        requestArguments.forEach(requestArgument => {
            switch (requestArgument.transport) {
                case 'path':
                    url = url.replace('{' + requestArgument.name + '}', requestArgument.value);
                    break;
                case 'header':
                    opts.headers[requestArgument.name] = requestArgument.value;
                    break;
                case 'body':
                    opts.body = JSON.stringify(requestArgument.value);
                    opts.headers['Content-Type'] = 'application/json';
                    break;
                case 'query':
                    query.push(encodeURIComponent(requestArgument.name) + '=' + encodeURIComponent(requestArgument.value));
                    break;
            }
        });

        if (query.length > 0) {
            opts.url += '?' + query.join('&');
        }

        const result = await fetch(url, opts);

        return result.json();
    }
}

module.exports = RestClient;