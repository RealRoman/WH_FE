import React from 'react';
import { Router } from './routes'
import { AuthProvider } from './context'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom';
import './index.css';

const queryClient = new QueryClient()

ReactDOM.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider> 
  </AuthProvider>
  ,
  document.getElementById('root')
);
