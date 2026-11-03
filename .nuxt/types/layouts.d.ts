import type { ComputedRef, MaybeRef } from 'vue'

type ComponentProps<T> = T extends new(...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
  : {}

declare module 'nuxt/app' {
  interface NuxtLayouts {
    adminlayout: ComponentProps<typeof import("/home/claude/bamcopt/layouts/adminlayout.vue").default>,
    app: ComponentProps<typeof import("/home/claude/bamcopt/layouts/app.vue").default>,
    auth: ComponentProps<typeof import("/home/claude/bamcopt/layouts/auth.vue").default>,
    default: ComponentProps<typeof import("/home/claude/bamcopt/layouts/default.vue").default>,
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}