import axios from 'axios'
import { rootAPI } from './root-api'

export const getFavourites = async () => {
  try {
    const response = await axios.get(`${rootAPI}/library/`)
    const data = await response.data
    return data // Return the fetched data
  } catch (error) {
    throw new Error('Error fetching favourites') // Handle errors appropriately
  }
}
