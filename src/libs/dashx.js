import DashX from '@dashx/browser';

const dashx = DashX({
  baseUri: import.meta.env.VITE_DASHX_BASE_URI,
  publicKey: import.meta.env.VITE_DASHX_PUBLIC_KEY,
  targetEnvironment: import.meta.env.VITE_DASHX_TARGET_ENVIRONMENT,
});

export default dashx;
