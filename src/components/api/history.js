import axios from 'axios'
import { rootAPI } from './root-api'

export const getHistory = async () => {
  try {
    const response = await axios.get(`${rootAPI}/history/`)
    const data = await response.data
    return data // Return the fetched data
  } catch (error) {
    throw new Error('Error fetching history') // Handle errors appropriately
  }
}
