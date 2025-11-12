import { renderHook, waitFor } from '@testing-library/react'
import { useFoods } from '@/hooks/useFoods'
import { foodApi } from '@/lib/api'
import { FoodItem } from '@/types/food'

// Mock the API module
jest.mock('@/lib/api', () => ({
  foodApi: {
    getAllFoods: jest.fn(),
    searchFoods: jest.fn(),
  },
}))

describe('useFoods Hook - API Mocking Tests', () => {
  const mockFoods: FoodItem[] = [
    {
      id: '1',
      createdAt: '2024-01-01',
      name: 'Burger',
      restaurantName: 'Burger Palace',
      rating: 4.5,
      Price: '12.99',
      status: 'Open Now',
      open: true,
      image: 'https://example.com/burger.jpg',
    },
    {
      id: '2',
      createdAt: '2024-01-02',
      name: 'Pizza',
      restaurantName: 'Pizza House',
      rating: 4.8,
      Price: '15.99',
      status: 'Open Now',
      open: true,
      image: 'https://example.com/pizza.jpg',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch and display foods successfully', async () => {
    const mockGetAllFoods = foodApi.getAllFoods as jest.Mock
    mockGetAllFoods.mockResolvedValueOnce(mockFoods)

    const { result } = renderHook(() => useFoods())

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Verify the data was fetched correctly
    expect(mockGetAllFoods).toHaveBeenCalledTimes(1)
    expect(result.current.foods).toEqual(mockFoods)
    expect(result.current.error).toBeNull()
  })

  it('should handle error when fetching foods fails', async () => {
    const mockGetAllFoods = foodApi.getAllFoods as jest.Mock
    mockGetAllFoods.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useFoods())

    // Wait for the error to be set
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('No Meals Found')
    expect(result.current.foods).toEqual([])
  })
})
