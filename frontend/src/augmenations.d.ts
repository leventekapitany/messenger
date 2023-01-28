export {};

declare module 'vue-router' {
  interface RouteMeta {
    requiresLogin?: boolean;
    loginCheck?: boolean;
    standalone?: boolean;
  }
}
