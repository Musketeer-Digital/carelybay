type FetcherArgs = Parameters<typeof fetch>;
interface FetcherResponse {
  json(): Promise<any>;
}

export const fetcher = (...args: FetcherArgs): Promise<any> =>
  fetch(...args).then((res: FetcherResponse) => res.json());
