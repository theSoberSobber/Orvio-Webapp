import axios from "axios"
import { API_CONFIG } from "@/config/api"

interface ApiConfig {
  accessToken: string
  refreshToken: string
}

interface RefreshResponse {
  accessToken: string
}

export function useAuthApi({ accessToken, refreshToken }: ApiConfig) {
  const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const response = await axios.post<RefreshResponse>(
            `${API_CONFIG.BASE_URL}/auth/refresh`,
            { refreshToken }
          )

          const { accessToken: newAccessToken } = response.data
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return api(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    }
  )

  return api
} 