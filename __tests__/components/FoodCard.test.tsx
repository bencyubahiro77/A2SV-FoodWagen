import { render, screen } from '@testing-library/react'
import { FoodCard } from '@/components/FoodCard'
import { FoodItem } from '@/types/food'

// Mock the ImageWithFallback component
jest.mock('@/components/ImageWithFallback', () => ({
  ImageWithFallback: ({ alt, fallbackIcon }: any) => (
    <div data-testid="mock-image">{alt}</div>
  ),
}))

describe('FoodCard - Component Rendering Tests', () => {
  const mockFood: FoodItem = {
    id: '1',
    createdAt: '2024-01-01',
    name: 'Delicious Burger',
    restaurantName: 'Burger Palace',
    rating: 4.5,
    Price: '12.99',
    status: 'Open Now',
    open: true,
    image: 'https://example.com/burger.jpg',
    logo: 'https://example.com/logo.jpg',
  }

  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()

  it('should render component with food name', () => {
    render(
      <FoodCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    )

    expect(screen.getAllByText('Delicious Burger')[0]).toBeInTheDocument()
  })

  it('should display price correctly', () => {
    render(
      <FoodCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    )

    expect(screen.getByText('$12.99')).toBeInTheDocument()
  })

  it('should display rating correctly', () => {
    render(
      <FoodCard food={mockFood} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    )

    expect(screen.getByText('4.5')).toBeInTheDocument()
  })
})
