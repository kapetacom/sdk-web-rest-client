/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */
import { BaseRestClient } from '@kapeta/sdk-rest';

export class RestClient extends BaseRestClient {

    constructor(baseUrl: string) {
        super(window.fetch.bind(window), baseUrl);
    }
}
