
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const BalanceDropdown: typeof import("../components/BalanceDropdown.vue")['default']
export const Footer: typeof import("../components/Footer.vue")['default']
export const ForgotPassword: typeof import("../components/ForgotPassword.vue")['default']
export const Header: typeof import("../components/Header.vue")['default']
export const LoginMenu: typeof import("../components/LoginMenu.vue")['default']
export const MainMobileNav: typeof import("../components/MainMobileNav.vue")['default']
export const MobileNav: typeof import("../components/MobileNav.vue")['default']
export const NFTexLogo: typeof import("../components/NFTexLogo.vue")['default']
export const NFTexLogoMini: typeof import("../components/NFTexLogoMini.vue")['default']
export const Navbar: typeof import("../components/Navbar.vue")['default']
export const Toast: typeof import("../components/Toast.vue")['default']
export const AdminAsideBar: typeof import("../components/admin/AsideBar.vue")['default']
export const AdminBalance: typeof import("../components/admin/Balance.vue")['default']
export const AdminHeader: typeof import("../components/admin/Header.vue")['default']
export const AdminMobileNavBar: typeof import("../components/admin/MobileNavBar.vue")['default']
export const AdminNotifications: typeof import("../components/admin/Notifications.vue")['default']
export const AdminSideBar: typeof import("../components/admin/SideBar.vue")['default']
export const AdminTopUpWithEmail: typeof import("../components/admin/TopUpWithEmail.vue")['default']
export const AdminUser: typeof import("../components/admin/User.vue")['default']
export const AdminUserMenuDropdown: typeof import("../components/admin/UserMenuDropdown.vue")['default']
export const AdminNotificationEntry: typeof import("../components/admin/notification/Entry.vue")['default']
export const AdminSettingsDeactivate: typeof import("../components/admin/settings/deactivate.vue")['default']
export const AdminSettingsEmail: typeof import("../components/admin/settings/email.vue")['default']
export const AdminSettingsLoginSessions: typeof import("../components/admin/settings/loginSessions.vue")['default']
export const AdminSettingsNotification: typeof import("../components/admin/settings/notification.vue")['default']
export const AdminTransactionEntry: typeof import("../components/admin/transaction/Entry.vue")['default']
export const AdminTransactionKeypad: typeof import("../components/admin/transaction/Keypad.vue")['default']
export const AdminUserNotify: typeof import("../components/admin/user/Notify.vue")['default']
export const AdminUserProfile: typeof import("../components/admin/user/Profile.vue")['default']
export const AdminUserTransaction: typeof import("../components/admin/user/Transaction.vue")['default']
export const AdminUsersNewUser: typeof import("../components/admin/users/NewUser.vue")['default']
export const AdminUsersUser: typeof import("../components/admin/users/User.vue")['default']
export const AppAsideBar: typeof import("../components/app/AsideBar.vue")['default']
export const AppBalance: typeof import("../components/app/Balance.vue")['default']
export const AppHeader: typeof import("../components/app/Header.vue")['default']
export const AppMobileNavBar: typeof import("../components/app/MobileNavBar.vue")['default']
export const AppNotifications: typeof import("../components/app/Notifications.vue")['default']
export const AppSideBar: typeof import("../components/app/SideBar.vue")['default']
export const AppTopUp: typeof import("../components/app/TopUp.vue")['default']
export const AppUpgradeAccount: typeof import("../components/app/UpgradeAccount.vue")['default']
export const AppUserMenuDropdown: typeof import("../components/app/UserMenuDropdown.vue")['default']
export const AppNotificationEntry: typeof import("../components/app/notification/Entry.vue")['default']
export const AppSettingsDeactivate: typeof import("../components/app/settings/deactivate.vue")['default']
export const AppSettingsEmail: typeof import("../components/app/settings/email.vue")['default']
export const AppSettingsLoginSessions: typeof import("../components/app/settings/loginSessions.vue")['default']
export const AppSettingsNotification: typeof import("../components/app/settings/notification.vue")['default']
export const AppTransactionEntry: typeof import("../components/app/transaction/Entry.vue")['default']
export const AppTransactionKeypad: typeof import("../components/app/transaction/Keypad.vue")['default']
export const AppTransactionToBank: typeof import("../components/app/transaction/ToBank.vue")['default']
export const AppTransactionToElisa: typeof import("../components/app/transaction/ToElisa.vue")['default']
export const SwiperMainSlide: typeof import("../components/swiper/MainSlide.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/nuxt-img")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/nuxt-picture")['default']
export const Swiper: typeof import("swiper/vue")['Swiper']
export const SwiperSlide: typeof import("swiper/vue")['SwiperSlide']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyBalanceDropdown: LazyComponent<typeof import("../components/BalanceDropdown.vue")['default']>
export const LazyFooter: LazyComponent<typeof import("../components/Footer.vue")['default']>
export const LazyForgotPassword: LazyComponent<typeof import("../components/ForgotPassword.vue")['default']>
export const LazyHeader: LazyComponent<typeof import("../components/Header.vue")['default']>
export const LazyLoginMenu: LazyComponent<typeof import("../components/LoginMenu.vue")['default']>
export const LazyMainMobileNav: LazyComponent<typeof import("../components/MainMobileNav.vue")['default']>
export const LazyMobileNav: LazyComponent<typeof import("../components/MobileNav.vue")['default']>
export const LazyNFTexLogo: LazyComponent<typeof import("../components/NFTexLogo.vue")['default']>
export const LazyNFTexLogoMini: LazyComponent<typeof import("../components/NFTexLogoMini.vue")['default']>
export const LazyNavbar: LazyComponent<typeof import("../components/Navbar.vue")['default']>
export const LazyToast: LazyComponent<typeof import("../components/Toast.vue")['default']>
export const LazyAdminAsideBar: LazyComponent<typeof import("../components/admin/AsideBar.vue")['default']>
export const LazyAdminBalance: LazyComponent<typeof import("../components/admin/Balance.vue")['default']>
export const LazyAdminHeader: LazyComponent<typeof import("../components/admin/Header.vue")['default']>
export const LazyAdminMobileNavBar: LazyComponent<typeof import("../components/admin/MobileNavBar.vue")['default']>
export const LazyAdminNotifications: LazyComponent<typeof import("../components/admin/Notifications.vue")['default']>
export const LazyAdminSideBar: LazyComponent<typeof import("../components/admin/SideBar.vue")['default']>
export const LazyAdminTopUpWithEmail: LazyComponent<typeof import("../components/admin/TopUpWithEmail.vue")['default']>
export const LazyAdminUser: LazyComponent<typeof import("../components/admin/User.vue")['default']>
export const LazyAdminUserMenuDropdown: LazyComponent<typeof import("../components/admin/UserMenuDropdown.vue")['default']>
export const LazyAdminNotificationEntry: LazyComponent<typeof import("../components/admin/notification/Entry.vue")['default']>
export const LazyAdminSettingsDeactivate: LazyComponent<typeof import("../components/admin/settings/deactivate.vue")['default']>
export const LazyAdminSettingsEmail: LazyComponent<typeof import("../components/admin/settings/email.vue")['default']>
export const LazyAdminSettingsLoginSessions: LazyComponent<typeof import("../components/admin/settings/loginSessions.vue")['default']>
export const LazyAdminSettingsNotification: LazyComponent<typeof import("../components/admin/settings/notification.vue")['default']>
export const LazyAdminTransactionEntry: LazyComponent<typeof import("../components/admin/transaction/Entry.vue")['default']>
export const LazyAdminTransactionKeypad: LazyComponent<typeof import("../components/admin/transaction/Keypad.vue")['default']>
export const LazyAdminUserNotify: LazyComponent<typeof import("../components/admin/user/Notify.vue")['default']>
export const LazyAdminUserProfile: LazyComponent<typeof import("../components/admin/user/Profile.vue")['default']>
export const LazyAdminUserTransaction: LazyComponent<typeof import("../components/admin/user/Transaction.vue")['default']>
export const LazyAdminUsersNewUser: LazyComponent<typeof import("../components/admin/users/NewUser.vue")['default']>
export const LazyAdminUsersUser: LazyComponent<typeof import("../components/admin/users/User.vue")['default']>
export const LazyAppAsideBar: LazyComponent<typeof import("../components/app/AsideBar.vue")['default']>
export const LazyAppBalance: LazyComponent<typeof import("../components/app/Balance.vue")['default']>
export const LazyAppHeader: LazyComponent<typeof import("../components/app/Header.vue")['default']>
export const LazyAppMobileNavBar: LazyComponent<typeof import("../components/app/MobileNavBar.vue")['default']>
export const LazyAppNotifications: LazyComponent<typeof import("../components/app/Notifications.vue")['default']>
export const LazyAppSideBar: LazyComponent<typeof import("../components/app/SideBar.vue")['default']>
export const LazyAppTopUp: LazyComponent<typeof import("../components/app/TopUp.vue")['default']>
export const LazyAppUpgradeAccount: LazyComponent<typeof import("../components/app/UpgradeAccount.vue")['default']>
export const LazyAppUserMenuDropdown: LazyComponent<typeof import("../components/app/UserMenuDropdown.vue")['default']>
export const LazyAppNotificationEntry: LazyComponent<typeof import("../components/app/notification/Entry.vue")['default']>
export const LazyAppSettingsDeactivate: LazyComponent<typeof import("../components/app/settings/deactivate.vue")['default']>
export const LazyAppSettingsEmail: LazyComponent<typeof import("../components/app/settings/email.vue")['default']>
export const LazyAppSettingsLoginSessions: LazyComponent<typeof import("../components/app/settings/loginSessions.vue")['default']>
export const LazyAppSettingsNotification: LazyComponent<typeof import("../components/app/settings/notification.vue")['default']>
export const LazyAppTransactionEntry: LazyComponent<typeof import("../components/app/transaction/Entry.vue")['default']>
export const LazyAppTransactionKeypad: LazyComponent<typeof import("../components/app/transaction/Keypad.vue")['default']>
export const LazyAppTransactionToBank: LazyComponent<typeof import("../components/app/transaction/ToBank.vue")['default']>
export const LazyAppTransactionToElisa: LazyComponent<typeof import("../components/app/transaction/ToElisa.vue")['default']>
export const LazySwiperMainSlide: LazyComponent<typeof import("../components/swiper/MainSlide.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/nuxt-img")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/nuxt-picture")['default']>
export const LazySwiper: LazyComponent<typeof import("swiper/vue")['Swiper']>
export const LazySwiperSlide: LazyComponent<typeof import("swiper/vue")['SwiperSlide']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
