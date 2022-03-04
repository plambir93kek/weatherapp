import { useContext } from "react"
import { ApiContext } from "../API/ApiProvider"

export const useApi = () => useContext(ApiContext)