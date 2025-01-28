interface CustomError extends Error {
  status: number
  text: string
}

interface JSONResponse {
  ok: boolean
  status: number
  statusText: string
  json: <T>() => Promise<T>
}

const BASE_URL = import.meta.env.VITE_POKEMON_API_URL

const handleJSONResponse = <T>(response: JSONResponse): Promise<T> => {
  return response
    .json<T>()
    .then((data) => data)
    .catch((error) => {
      console.log('error', error)
      const customError: CustomError = {
        name: 'CustomError',
        message: 'An error occurred',
        status: response.status,
        text: response.statusText,
        ...error,
      }
      throw customError
    })
}

const enhancedFetch = (path: string) => {
  const headers = {
    ['Accept']: 'application/json',
  }

  const method = { method: 'GET' }

  return fetch(`${BASE_URL}/${path}`, { headers, ...method }).then(handleJSONResponse)
}

export default enhancedFetch
