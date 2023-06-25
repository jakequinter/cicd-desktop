import { createClient } from '@rspc/client';
import { createReactQueryHooks } from '@rspc/react';
import { TauriTransport } from '@rspc/tauri';
import { QueryClient } from '@tanstack/react-query';

import type { Procedures } from './bindings';

export const client = createClient<Procedures>({
  transport: new TauriTransport(),
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // If you want to retry when requests fail, remove this.
    },
  },
});

export const {
  useContext,
  useMutation,
  useQuery,
  useSubscription,
  Provider: RSPCProvider,
} = createReactQueryHooks<Procedures>();
