import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog'
import { foodApi } from '@/lib/api'

// Mock the API
jest.mock('@/lib/api', () => ({
  foodApi: {
    deleteFood: jest.fn(),
  },
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('DeleteConfirmDialog - Button Click Tests', () => {
  const mockOnOpenChange = jest.fn()
  const mockOnSuccess = jest.fn()
  const mockFoodId = '123'
  const mockFoodName = 'Delicious Burger'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call delete API when Yes button is clicked', async () => {
    const user = userEvent.setup()
    const mockDeleteFood = foodApi.deleteFood as jest.Mock
    mockDeleteFood.mockResolvedValueOnce(undefined)

    render(
      <DeleteConfirmDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        foodId={mockFoodId}
        foodName={mockFoodName}
        onSuccess={mockOnSuccess}
      />
    )

    const yesButton = screen.getByRole('button', { name: /yes/i })
    await user.click(yesButton)

    await waitFor(() => {
      expect(mockDeleteFood).toHaveBeenCalledWith(mockFoodId)
    })
  })

  it('should close dialog when Cancel button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <DeleteConfirmDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        foodId={mockFoodId}
        foodName={mockFoodName}
        onSuccess={mockOnSuccess}
      />
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })
})
