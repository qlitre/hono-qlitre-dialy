import { MicroCMSQueries } from "microcms-js-sdk";

const isObject = (value: unknown): value is Record<string, unknown> => {
    return value !== null && typeof value === 'object';
};

const parseQuery = (queries: MicroCMSQueries): string => {
    if (!isObject(queries)) {
        throw new Error('queries is not object');
    }
    const queryString = new URLSearchParams(
        Object.entries(queries).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = String(value);
                }
                return acc;
            },
            {} as Record<string, string>,
        ),
    ).toString();

    return queryString;
};

class MicroCMSClient {
    private serviceDomain: string;
    private apiKey: string;

    constructor(serviceDomain: string, apiKey: string) {
        this.serviceDomain = serviceDomain;
        this.apiKey = apiKey;
    }

    private async fetchFromCMS<T>(url: string): Promise<T> {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MICROCMS-API-KEY': this.apiKey,
            },
        };

        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json() as Promise<T>;
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
                throw error
            });
    }

    public async getListResponse<T>(endpoint: string, queries?: MicroCMSQueries): Promise<T> {
        const baseUrl = `https://${this.serviceDomain}.microcms.io/api/v1/`;
        let url = `${baseUrl}${endpoint}`;
        if (queries) {
            const queryString = parseQuery(queries);
            url += '?' + queryString;
        }

        return this.fetchFromCMS<T>(url);
    }

    public async getDetail<T>(endpoint: string, contentId: string, queries?: MicroCMSQueries): Promise<T> {
        const baseUrl = `https://${this.serviceDomain}.microcms.io/api/v1/`;
        let url = `${baseUrl}${endpoint}/${contentId}`;
        if (queries) {
            const queryString = parseQuery(queries);
            url += '?' + queryString;
        }

        return this.fetchFromCMS<T>(url);
    }
}

export { MicroCMSClient };
