import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SYSTEM_URL,
})

const httpRequest = ({
  endpoint,
  method = "get",
  bodyParameters,
  query,
  requireToken = false,
}) => {
  let config

  if (requireToken) {
    const accessToken = JSON.parse(localStorage.getItem("authInfo"))[
      "accessToken"
    ]
    config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
    }
  }

  if (method === "get" || method === "GET") {
    return axiosClient[method](endpoint, config)
  }

  return axiosClient[method](endpoint, bodyParameters, config)
}

export default httpRequest
