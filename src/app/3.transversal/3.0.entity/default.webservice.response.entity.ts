export interface DefaultWsResponseEntity<T> {
    total: number;
    data: T | null;
}