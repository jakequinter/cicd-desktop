import { invoke } from '@tauri-apps/api/tauri';

export const fetcher = <TResult>([commandParam, argsParam]: [
  string,
  Record<string, any>
]): Promise<TResult> => invoke<TResult>(commandParam, argsParam);
