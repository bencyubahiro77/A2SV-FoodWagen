import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddFoodDialog } from '@/components/AddFoodDialog'
import { foodApi } from '@/lib/api'

// Mock the API
jest.mock('@/lib/api', () => ({
  foodApi: {
    createFood: jest.fn(),
  },
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('AddFoodDialog - Form Submission Tests', () => {
  const mockOnOpenChange = jest.fn()
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    const mockCreateFood = foodApi.createFood as jest.Mock
    mockCreateFood.mockReset()
  })

  it('should submit form successfully with valid data', async () => {
    const user = userEvent.setup()
    const mockCreateFood = foodApi.createFood as jest.Mock
    mockCreateFood.mockResolvedValueOnce({
      id: '123',
      name: 'Margherita Pizza',
      restaurantName: 'Italian Bistro',
      rating: 4.8,
      Price: '15.99',
      status: 'Open Now',
      open: true,
    })

    render(
      <AddFoodDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSuccess={mockOnSuccess}
      />
    )

    // Fill in the form
    await user.type(screen.getByLabelText(/food name/i), 'Margherita Pizza')
    await user.type(screen.getByLabelText(/restaurant name/i), 'Italian Bistro')
    await user.type(screen.getByLabelText(/food rating/i), '4.8')
    await user.type(screen.getByLabelText(/food image/i), 'https://example.com/pizza.jpg')
    await user.type(screen.getByLabelText(/restaurant logo/i), 'https://example.com/logo.jpg')
    await user.type(screen.getByLabelText(/price/i), '15.99')

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /add food/i })
    await user.click(submitButton)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockCreateFood).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Margherita Pizza',
          restaurantName: 'Italian Bistro',
          rating: 4.8,
          Price: '15.99',
        })
      )
    })

    // Verify callbacks were called
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled()
      expect(mockOnOpenChange).toHaveBeenCalledWith(false)
    })
  })

  it('should handle form input changes', async () => {
    const user = userEvent.setup()
    
    render(
      <AddFoodDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onSuccess={mockOnSuccess}
      />
    )

    const nameInput = screen.getByLabelText(/food name/i)
    await user.type(nameInput, 'Pizza')

    expect(nameInput).toHaveValue('Pizza')
  })
})
