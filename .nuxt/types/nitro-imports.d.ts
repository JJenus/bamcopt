declare global {
  const AccountLevelBody: typeof import('../../server/utils/schemas').AccountLevelBody
  const AccountUpdateBody: typeof import('../../server/utils/schemas').AccountUpdateBody
  const AppName: typeof import('../../server/utils/mail').AppName
  const AppSettingsBody: typeof import('../../server/utils/schemas').AppSettingsBody
  const BeneficiaryBody: typeof import('../../server/utils/schemas').BeneficiaryBody
  const CurrencyBody: typeof import('../../server/utils/schemas').CurrencyBody
  const EmailBody: typeof import('../../server/utils/schemas').EmailBody
  const H3Error: typeof import('../../node_modules/h3/dist/index').H3Error
  const H3Event: typeof import('../../node_modules/h3/dist/index').H3Event
  const LoginBody: typeof import('../../server/utils/schemas').LoginBody
  const NotificationBody: typeof import('../../server/utils/schemas').NotificationBody
  const NotificationUpdateBody: typeof import('../../server/utils/schemas').NotificationUpdateBody
  const OtpBody: typeof import('../../server/utils/schemas').OtpBody
  const RegisterBody: typeof import('../../server/utils/schemas').RegisterBody
  const ResetBody: typeof import('../../server/utils/schemas').ResetBody
  const SecurityLogBody: typeof import('../../server/utils/schemas').SecurityLogBody
  const TokenBody: typeof import('../../server/utils/schemas').TokenBody
  const TopUpBody: typeof import('../../server/utils/schemas').TopUpBody
  const TransactionUpdateBody: typeof import('../../server/utils/schemas').TransactionUpdateBody
  const TransferBody: typeof import('../../server/utils/schemas').TransferBody
  const UserUpdateBody: typeof import('../../server/utils/schemas').UserUpdateBody
  const __buildAssetsURL: typeof import('../../node_modules/@nuxt/nitro-server/dist/runtime/utils/paths').buildAssetsURL
  const __publicAssetsURL: typeof import('../../node_modules/@nuxt/nitro-server/dist/runtime/utils/paths').publicAssetsURL
  const appendCorsHeaders: typeof import('../../node_modules/h3/dist/index').appendCorsHeaders
  const appendCorsPreflightHeaders: typeof import('../../node_modules/h3/dist/index').appendCorsPreflightHeaders
  const appendHeader: typeof import('../../node_modules/h3/dist/index').appendHeader
  const appendHeaders: typeof import('../../node_modules/h3/dist/index').appendHeaders
  const appendResponseHeader: typeof import('../../node_modules/h3/dist/index').appendResponseHeader
  const appendResponseHeaders: typeof import('../../node_modules/h3/dist/index').appendResponseHeaders
  const assertMethod: typeof import('../../node_modules/h3/dist/index').assertMethod
  const badRequest: typeof import('../../server/utils/errors').badRequest
  const cachedEventHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').cachedEventHandler
  const cachedFunction: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').cachedFunction
  const callNodeListener: typeof import('../../node_modules/h3/dist/index').callNodeListener
  const clearResponseHeaders: typeof import('../../node_modules/h3/dist/index').clearResponseHeaders
  const clearSession: typeof import('../../node_modules/h3/dist/index').clearSession
  const conflict: typeof import('../../server/utils/errors').conflict
  const createApp: typeof import('../../node_modules/h3/dist/index').createApp
  const createAppEventHandler: typeof import('../../node_modules/h3/dist/index').createAppEventHandler
  const createError: typeof import('../../node_modules/h3/dist/index').createError
  const createEvent: typeof import('../../node_modules/h3/dist/index').createEvent
  const createEventStream: typeof import('../../node_modules/h3/dist/index').createEventStream
  const createRouter: typeof import('../../node_modules/h3/dist/index').createRouter
  const defaultContentType: typeof import('../../node_modules/h3/dist/index').defaultContentType
  const defineAppConfig: typeof import('../../node_modules/@nuxt/nitro-server/dist/runtime/utils/config').defineAppConfig
  const defineCachedEventHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').defineCachedEventHandler
  const defineCachedFunction: typeof import('../../node_modules/nitropack/dist/runtime/internal/cache').defineCachedFunction
  const defineEventHandler: typeof import('../../node_modules/h3/dist/index').defineEventHandler
  const defineLazyEventHandler: typeof import('../../node_modules/h3/dist/index').defineLazyEventHandler
  const defineNitroErrorHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/error/utils').defineNitroErrorHandler
  const defineNitroPlugin: typeof import('../../node_modules/nitropack/dist/runtime/internal/plugin').defineNitroPlugin
  const defineNodeListener: typeof import('../../node_modules/h3/dist/index').defineNodeListener
  const defineNodeMiddleware: typeof import('../../node_modules/h3/dist/index').defineNodeMiddleware
  const defineRenderHandler: typeof import('../../node_modules/nitropack/dist/runtime/internal/renderer').defineRenderHandler
  const defineRequestMiddleware: typeof import('../../node_modules/h3/dist/index').defineRequestMiddleware
  const defineResponseMiddleware: typeof import('../../node_modules/h3/dist/index').defineResponseMiddleware
  const defineRouteMeta: typeof import('../../node_modules/nitropack/dist/runtime/internal/meta').defineRouteMeta
  const defineTask: typeof import('../../node_modules/nitropack/dist/runtime/internal/task').defineTask
  const defineWebSocket: typeof import('../../node_modules/h3/dist/index').defineWebSocket
  const defineWebSocketHandler: typeof import('../../node_modules/h3/dist/index').defineWebSocketHandler
  const deleteCookie: typeof import('../../node_modules/h3/dist/index').deleteCookie
  const dynamicEventHandler: typeof import('../../node_modules/h3/dist/index').dynamicEventHandler
  const env: typeof import('../../server/utils/env').env
  const eventHandler: typeof import('../../node_modules/h3/dist/index').eventHandler
  const fetchWithEvent: typeof import('../../node_modules/h3/dist/index').fetchWithEvent
  const forbidden: typeof import('../../server/utils/errors').forbidden
  const fromMinor: typeof import('../../server/utils/money').fromMinor
  const fromNodeMiddleware: typeof import('../../node_modules/h3/dist/index').fromNodeMiddleware
  const fromPlainHandler: typeof import('../../node_modules/h3/dist/index').fromPlainHandler
  const fromWebHandler: typeof import('../../node_modules/h3/dist/index').fromWebHandler
  const getCookie: typeof import('../../node_modules/h3/dist/index').getCookie
  const getHeader: typeof import('../../node_modules/h3/dist/index').getHeader
  const getHeaders: typeof import('../../node_modules/h3/dist/index').getHeaders
  const getMethod: typeof import('../../node_modules/h3/dist/index').getMethod
  const getProxyRequestHeaders: typeof import('../../node_modules/h3/dist/index').getProxyRequestHeaders
  const getQuery: typeof import('../../node_modules/h3/dist/index').getQuery
  const getRequestFingerprint: typeof import('../../node_modules/h3/dist/index').getRequestFingerprint
  const getRequestHeader: typeof import('../../node_modules/h3/dist/index').getRequestHeader
  const getRequestHeaders: typeof import('../../node_modules/h3/dist/index').getRequestHeaders
  const getRequestHost: typeof import('../../node_modules/h3/dist/index').getRequestHost
  const getRequestIP: typeof import('../../node_modules/h3/dist/index').getRequestIP
  const getRequestPath: typeof import('../../node_modules/h3/dist/index').getRequestPath
  const getRequestProtocol: typeof import('../../node_modules/h3/dist/index').getRequestProtocol
  const getRequestURL: typeof import('../../node_modules/h3/dist/index').getRequestURL
  const getRequestWebStream: typeof import('../../node_modules/h3/dist/index').getRequestWebStream
  const getResponseHeader: typeof import('../../node_modules/h3/dist/index').getResponseHeader
  const getResponseHeaders: typeof import('../../node_modules/h3/dist/index').getResponseHeaders
  const getResponseStatus: typeof import('../../node_modules/h3/dist/index').getResponseStatus
  const getResponseStatusText: typeof import('../../node_modules/h3/dist/index').getResponseStatusText
  const getRouteRules: typeof import('../../node_modules/nitropack/dist/runtime/internal/route-rules').getRouteRules
  const getRouterParam: typeof import('../../node_modules/h3/dist/index').getRouterParam
  const getRouterParams: typeof import('../../node_modules/h3/dist/index').getRouterParams
  const getSession: typeof import('../../node_modules/h3/dist/index').getSession
  const getValidatedQuery: typeof import('../../node_modules/h3/dist/index').getValidatedQuery
  const getValidatedRouterParams: typeof import('../../node_modules/h3/dist/index').getValidatedRouterParams
  const handleCacheHeaders: typeof import('../../node_modules/h3/dist/index').handleCacheHeaders
  const handleCors: typeof import('../../node_modules/h3/dist/index').handleCors
  const isAdmin: typeof import('../../server/utils/auth').isAdmin
  const isCorsOriginAllowed: typeof import('../../node_modules/h3/dist/index').isCorsOriginAllowed
  const isError: typeof import('../../node_modules/h3/dist/index').isError
  const isEvent: typeof import('../../node_modules/h3/dist/index').isEvent
  const isEventHandler: typeof import('../../node_modules/h3/dist/index').isEventHandler
  const isMethod: typeof import('../../node_modules/h3/dist/index').isMethod
  const isPreflightRequest: typeof import('../../node_modules/h3/dist/index').isPreflightRequest
  const isStream: typeof import('../../node_modules/h3/dist/index').isStream
  const isWebResponse: typeof import('../../node_modules/h3/dist/index').isWebResponse
  const lazyEventHandler: typeof import('../../node_modules/h3/dist/index').lazyEventHandler
  const mailEnabled: typeof import('../../server/utils/mail').mailEnabled
  const nitroPlugin: typeof import('../../node_modules/nitropack/dist/runtime/internal/plugin').nitroPlugin
  const notFound: typeof import('../../server/utils/errors').notFound
  const parseBody: typeof import('../../server/utils/validate').parseBody
  const parseCookies: typeof import('../../node_modules/h3/dist/index').parseCookies
  const positiveMinor: typeof import('../../server/utils/money').positiveMinor
  const promisifyNodeListener: typeof import('../../node_modules/h3/dist/index').promisifyNodeListener
  const proxyRequest: typeof import('../../node_modules/h3/dist/index').proxyRequest
  const readBody: typeof import('../../node_modules/h3/dist/index').readBody
  const readFormData: typeof import('../../node_modules/h3/dist/index').readFormData
  const readMultipartFormData: typeof import('../../node_modules/h3/dist/index').readMultipartFormData
  const readRawBody: typeof import('../../node_modules/h3/dist/index').readRawBody
  const readValidatedBody: typeof import('../../node_modules/h3/dist/index').readValidatedBody
  const removeResponseHeader: typeof import('../../node_modules/h3/dist/index').removeResponseHeader
  const requireAdmin: typeof import('../../server/utils/auth').requireAdmin
  const requireAuth: typeof import('../../server/utils/auth').requireAuth
  const requireSelfOrAdmin: typeof import('../../server/utils/auth').requireSelfOrAdmin
  const runTask: typeof import('../../node_modules/nitropack/dist/runtime/internal/task').runTask
  const sanitizeStatusCode: typeof import('../../node_modules/h3/dist/index').sanitizeStatusCode
  const sanitizeStatusMessage: typeof import('../../node_modules/h3/dist/index').sanitizeStatusMessage
  const sealSession: typeof import('../../node_modules/h3/dist/index').sealSession
  const send: typeof import('../../node_modules/h3/dist/index').send
  const sendError: typeof import('../../node_modules/h3/dist/index').sendError
  const sendIterable: typeof import('../../node_modules/h3/dist/index').sendIterable
  const sendNoContent: typeof import('../../node_modules/h3/dist/index').sendNoContent
  const sendOtpEmail: typeof import('../../server/utils/mail').sendOtpEmail
  const sendPasswordEmail: typeof import('../../server/utils/mail').sendPasswordEmail
  const sendProxy: typeof import('../../node_modules/h3/dist/index').sendProxy
  const sendRedirect: typeof import('../../node_modules/h3/dist/index').sendRedirect
  const sendStream: typeof import('../../node_modules/h3/dist/index').sendStream
  const sendWebResponse: typeof import('../../node_modules/h3/dist/index').sendWebResponse
  const sendWelcomeEmail: typeof import('../../server/utils/mail').sendWelcomeEmail
  const sequelize: typeof import('../../server/utils/db').sequelize
  const serveStatic: typeof import('../../node_modules/h3/dist/index').serveStatic
  const setCookie: typeof import('../../node_modules/h3/dist/index').setCookie
  const setHeader: typeof import('../../node_modules/h3/dist/index').setHeader
  const setHeaders: typeof import('../../node_modules/h3/dist/index').setHeaders
  const setResponseHeader: typeof import('../../node_modules/h3/dist/index').setResponseHeader
  const setResponseHeaders: typeof import('../../node_modules/h3/dist/index').setResponseHeaders
  const setResponseStatus: typeof import('../../node_modules/h3/dist/index').setResponseStatus
  const signOtpChallenge: typeof import('../../server/utils/auth').signOtpChallenge
  const signPurposeToken: typeof import('../../server/utils/auth').signPurposeToken
  const signSession: typeof import('../../server/utils/auth').signSession
  const splitCookiesString: typeof import('../../node_modules/h3/dist/index').splitCookiesString
  const toEventHandler: typeof import('../../node_modules/h3/dist/index').toEventHandler
  const toMinor: typeof import('../../server/utils/money').toMinor
  const toNodeListener: typeof import('../../node_modules/h3/dist/index').toNodeListener
  const toPlainHandler: typeof import('../../node_modules/h3/dist/index').toPlainHandler
  const toWebHandler: typeof import('../../node_modules/h3/dist/index').toWebHandler
  const toWebRequest: typeof import('../../node_modules/h3/dist/index').toWebRequest
  const unauthorized: typeof import('../../server/utils/errors').unauthorized
  const unprocessable: typeof import('../../server/utils/errors').unprocessable
  const unsealSession: typeof import('../../node_modules/h3/dist/index').unsealSession
  const updateSession: typeof import('../../node_modules/h3/dist/index').updateSession
  const useAppConfig: typeof import('../../node_modules/nitropack/dist/runtime/internal/config').useAppConfig
  const useBase: typeof import('../../node_modules/h3/dist/index').useBase
  const useEvent: typeof import('../../node_modules/nitropack/dist/runtime/internal/context').useEvent
  const useNitroApp: typeof import('../../node_modules/nitropack/dist/runtime/internal/app').useNitroApp
  const useRuntimeConfig: typeof import('../../node_modules/nitropack/dist/runtime/internal/config').useRuntimeConfig
  const useSession: typeof import('../../node_modules/h3/dist/index').useSession
  const useStorage: typeof import('../../node_modules/nitropack/dist/runtime/internal/storage').useStorage
  const uuidParam: typeof import('../../server/utils/validate').uuidParam
  const verifyOtpChallenge: typeof import('../../server/utils/auth').verifyOtpChallenge
  const verifyPurposeToken: typeof import('../../server/utils/auth').verifyPurposeToken
  const verifySession: typeof import('../../server/utils/auth').verifySession
  const writeEarlyHints: typeof import('../../node_modules/h3/dist/index').writeEarlyHints
  const z: typeof import('../../server/utils/validate').z
}
// for type re-export
declare global {
  // @ts-ignore
  export type { EventHandler, EventHandlerRequest, EventHandlerResponse, EventHandlerObject, H3EventContext } from '../../node_modules/h3/dist/index'
  import('../../node_modules/h3/dist/index')
  // @ts-ignore
  export type { AuthContext } from '../../server/utils/auth'
  import('../../server/utils/auth')
}
export { H3Event, H3Error, appendCorsHeaders, appendCorsPreflightHeaders, appendHeader, appendHeaders, appendResponseHeader, appendResponseHeaders, assertMethod, callNodeListener, clearResponseHeaders, clearSession, createApp, createAppEventHandler, createError, createEvent, createEventStream, createRouter, defaultContentType, defineEventHandler, defineLazyEventHandler, defineNodeListener, defineNodeMiddleware, defineRequestMiddleware, defineResponseMiddleware, defineWebSocket, defineWebSocketHandler, deleteCookie, dynamicEventHandler, eventHandler, fetchWithEvent, fromNodeMiddleware, fromPlainHandler, fromWebHandler, getCookie, getHeader, getHeaders, getMethod, getProxyRequestHeaders, getQuery, getRequestFingerprint, getRequestHeader, getRequestHeaders, getRequestHost, getRequestIP, getRequestPath, getRequestProtocol, getRequestURL, getRequestWebStream, getResponseHeader, getResponseHeaders, getResponseStatus, getResponseStatusText, getRouterParam, getRouterParams, getSession, getValidatedQuery, getValidatedRouterParams, handleCacheHeaders, handleCors, isCorsOriginAllowed, isError, isEvent, isEventHandler, isMethod, isPreflightRequest, isStream, isWebResponse, lazyEventHandler, parseCookies, promisifyNodeListener, proxyRequest, readBody, readFormData, readMultipartFormData, readRawBody, readValidatedBody, removeResponseHeader, sanitizeStatusCode, sanitizeStatusMessage, sealSession, send, sendError, sendIterable, sendNoContent, sendProxy, sendRedirect, sendStream, sendWebResponse, serveStatic, setCookie, setHeader, setHeaders, setResponseHeader, setResponseHeaders, setResponseStatus, splitCookiesString, toEventHandler, toNodeListener, toPlainHandler, toWebHandler, toWebRequest, unsealSession, updateSession, useBase, useSession, writeEarlyHints } from 'h3';
export { useNitroApp } from 'nitropack/runtime/internal/app';
export { useRuntimeConfig, useAppConfig } from 'nitropack/runtime/internal/config';
export { defineNitroPlugin, nitroPlugin } from 'nitropack/runtime/internal/plugin';
export { defineCachedFunction, defineCachedEventHandler, cachedFunction, cachedEventHandler } from 'nitropack/runtime/internal/cache';
export { useStorage } from 'nitropack/runtime/internal/storage';
export { defineRenderHandler } from 'nitropack/runtime/internal/renderer';
export { defineRouteMeta } from 'nitropack/runtime/internal/meta';
export { getRouteRules } from 'nitropack/runtime/internal/route-rules';
export { useEvent } from 'nitropack/runtime/internal/context';
export { defineTask, runTask } from 'nitropack/runtime/internal/task';
export { defineNitroErrorHandler } from 'nitropack/runtime/internal/error/utils';
export { buildAssetsURL as __buildAssetsURL, publicAssetsURL as __publicAssetsURL } from '/home/claude/bamcopt/node_modules/@nuxt/nitro-server/dist/runtime/utils/paths';
export { defineAppConfig } from '/home/claude/bamcopt/node_modules/@nuxt/nitro-server/dist/runtime/utils/config';
export { signSession, verifySession, signPurposeToken, verifyPurposeToken, requireAuth, isAdmin, requireAdmin, requireSelfOrAdmin, signOtpChallenge, verifyOtpChallenge } from '/home/claude/bamcopt/server/utils/auth';
export { sequelize } from '/home/claude/bamcopt/server/utils/db';
export { env } from '/home/claude/bamcopt/server/utils/env';
export { badRequest, unauthorized, forbidden, notFound, conflict, unprocessable } from '/home/claude/bamcopt/server/utils/errors';
export { AppName, mailEnabled, sendWelcomeEmail, sendPasswordEmail, sendOtpEmail } from '/home/claude/bamcopt/server/utils/mail';
export { toMinor, fromMinor, positiveMinor } from '/home/claude/bamcopt/server/utils/money';
export { LoginBody, OtpBody, EmailBody, TokenBody, ResetBody, RegisterBody, UserUpdateBody, TransferBody, TransactionUpdateBody, TopUpBody, AccountUpdateBody, NotificationBody, NotificationUpdateBody, BeneficiaryBody, SecurityLogBody, AppSettingsBody, CurrencyBody, AccountLevelBody } from '/home/claude/bamcopt/server/utils/schemas';
export { parseBody, uuidParam, z } from '/home/claude/bamcopt/server/utils/validate';