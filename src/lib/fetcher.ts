import { invoke } from '@tauri-apps/api/tauri';

const fetcher = <T>([commandParam, argsParam]: [
  string,
  Record<string, any>
]): Promise<T> => invoke<T>(commandParam, argsParam);

export default fetcher;
