import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "admin-auth" | "auth"
declare module "/home/jjenus/workbench/app/bancopt/bamcopt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}