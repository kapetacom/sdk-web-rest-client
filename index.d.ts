export declare interface RequestArgument {
    value: string
    name: string
    transport: string
}

declare class RestClient {
    constructor(basePath:string);
    execute(method:string, path:string, requestArguments:RequestArgument[]):Promise<any>
}

export default RestClient;