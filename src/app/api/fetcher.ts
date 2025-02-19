export const fetcher = (...rest: [RequestInfo, RequestInit?]) =>
  fetch(...rest).then((res) => res.json());
