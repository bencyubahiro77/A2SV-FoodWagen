# FoodWagen 🍔

A modern food delivery web application built with Next.js, featuring a beautiful UI for browsing and managing meals.

## Features

- **Browse Meals** - View a collection of delicious meals with images, prices, and ratings
- **Search Functionality** - Search for meals by name
- **Add New Meals** - Create new meal entries with detailed information
- **Edit Meals** - Update existing meal information
- **Delete Meals** - Remove meals from the collection
- **Restaurant Status** - See which restaurants are open or closed
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Built with TailwindCSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui, Radix UI
- **Form Management**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bencyubahiro77/A2SV-FoodWagen
   cd foodwagen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp env.example .env
   ```
   
   Add your API base URL:
   ```env
   NEXT_PUBLIC_API_BASE_URL="https://your-api-url.com"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

6. **deployed version**
   ```
   https://food-wagen-nine.vercel.app/
   ```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:coverage # Run tests with coverage report
```

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL="https://6852821e0594059b23cdd834.mockapi.io"
```

## Testing

The project includes comprehensive test coverage:

- **Component Rendering Tests** - Verify components display correctly
- **User Interaction Tests** - Test form submissions and button clicks
- **API Mocking Tests** - Test data fetching with mocked API calls

Run tests:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

## License

This project is licensed under the MIT License.
