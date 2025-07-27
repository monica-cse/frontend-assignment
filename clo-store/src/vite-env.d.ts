// vite-env.d.ts
/// <reference types="vite/client" />

declare module '*.jsx' {
  const component: any;
  export default component;
}
