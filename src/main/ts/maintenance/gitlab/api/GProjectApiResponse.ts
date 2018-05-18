export default interface GProjectApiResponse {
  id: number;
  description: string;
  name: string;
  path_with_namespace: string;
  merge_requests_enabled: boolean;
}
