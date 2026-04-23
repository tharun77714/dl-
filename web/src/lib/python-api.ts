const DEFAULT_PYTHON_API_URL = "http://localhost:8000";

export function getPythonApiBaseUrl() {
  return (process.env.PYTHON_API_URL || DEFAULT_PYTHON_API_URL).replace(/\/+$/, "");
}

export function getPythonApiHeaders(
  headers: Record<string, string> = {}
) {
  return {
    "ngrok-skip-browser-warning": "true",
    ...headers,
  };
}

export function getPythonApiJsonHeaders(
  headers: Record<string, string> = {}
) {
  return getPythonApiHeaders({
    "Content-Type": "application/json",
    ...headers,
  });
}
