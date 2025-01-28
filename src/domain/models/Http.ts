export interface Http {
  get: <T>(path: string, params?: Record<string, unknown>, config?: unknown) => Promise<T | unknown>
}
