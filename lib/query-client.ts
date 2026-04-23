import { QueryClient } from '@tanstack/react-query';
import { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import { storage } from './storage';

// 1. Query Client Ayarları
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // Çöp toplayıcı süresi: 24 saat (Offline cache süresi)
      staleTime: 1000 * 60 * 5, // Verinin bayatlama süresi: 5 dakika
      retry: 2, // Hata durumunda 2 kez tekrar dene
      refetchOnWindowFocus: false, // Mobilde her ekrana dönüldüğünde istek atılmasını engelle
    },
  },
});

// 2. MMKV Adaptörü (Persister)
export const clientPersister: Persister = {
  persistClient: async (client: PersistedClient) => {
    storage.set('REACT_QUERY_OFFLINE_CACHE', JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = storage.getString('REACT_QUERY_OFFLINE_CACHE');
    if (!cache) return undefined;
    return JSON.parse(cache) as PersistedClient;
  },
  removeClient: async () => {
    storage.delete('REACT_QUERY_OFFLINE_CACHE');
  },
};