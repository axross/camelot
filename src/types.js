export type HTTPResponse = {
  status: number;
  data: any;
}

export type HTTPClientAbstruct = {
  get(url: string, config: Object): Promise<HTTPResponse>;
  post(url: string, config: Object): Promise<HTTPResponse>;
  put(url: string, config: Object): Promise<HTTPResponse>;
  delete(url: string, config: Object): Promise<HTTPResponse>;
}

export type LRUCacheAbstruct = {
  get(key: string): any;
  set(key: string, value: any): void;
}
