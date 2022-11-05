import create from 'zustand'
import { createWeatherSlice } from './slices/weatherSlice'
import { createPlaceSlice } from './slices/placeSlice'

export const boundStore = create((...a) => ({
  ...createWeatherSlice(...a),
  ...createPlaceSlice(...a),
}))