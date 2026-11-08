import axios from 'axios'

interface Issue {
  path: PropertyKey[]
  message: string
}

const isIssue = (value: unknown): value is Issue =>
  typeof value === 'object' &&
  value !== null &&
  'message' in value &&
  typeof value.message === 'string' &&
  'path' in value &&
  Array.isArray(value.path)

const describeIssue = ({ path, message }: Issue) =>
  path.length > 0 ? `${path.join('.')}: ${message}` : message

export const errorMessage = (e: unknown): string => {
  if (!axios.isAxiosError(e)) {
    return 'Adding the entry failed'
  }

  const data: unknown = e.response?.data
  if (typeof data === 'string' && data.length > 0) {
    return data
  }

  if (typeof data === 'object' && data !== null && 'error' in data) {
    const { error } = data
    if (typeof error === 'string') {
      return error
    }
    if (Array.isArray(error) && error.every(isIssue)) {
      return error.map(describeIssue).join(', ')
    }
  }

  return e.message
}
