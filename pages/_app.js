import React from 'react';
import { Toaster } from 'react-hot-toast';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import '../styles/globals.css';

import { Layout } from '../components';
import { StateContext } from '../context/StateContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </StateContext>
  );
}

export default MyApp;
