import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "adminlayout" | "app" | "auth" | "default"
declare module "/home/jjenus/workbench/apps/bancopt/bancopt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}