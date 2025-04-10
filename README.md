# Budget Buddy

Budget Buddy is a comprehensive finance management application that helps users track expenses, manage budgets, and achieve financial goals.

## Features

- **User Authentication**: Secure login and signup functionality
- **Dashboard**: Financial overview with charts and statistics
- **Budget Management**: Create, track, and manage budgets by category
- **Transaction Tracking**: Record and categorize income and expenses
- **Monthly Analysis**: View spending patterns and trends
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme

## Tech Stack

- **Frontend**: React, Material-UI, Recharts
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/budget-buddy.git
   cd budget-buddy
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```

4. Start the development server

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
budget-buddy/
├── public/              # Static files
├── src/                 # Source files
│   ├── assets/          # Images, CSS, etc.
│   │   ├── admin/       # Admin components
│   │   ├── common/      # Common components (Login, Signup, etc.)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── layouts/     # Layout components
│   │   ├── pages/       # Page components (Dashboard, Budgets, etc.)
│   │   ├── user/        # User-related components
│   │   └── utils/       # Utility functions
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Usage

1. **Sign Up**: Create a new account
2. **Log In**: Access your account
3. **Dashboard**: View your financial overview
4. **Budgets**: Create and manage budgets
5. **Transactions**: Record and track your income and expenses
6. **Monthly Analysis**: View your spending patterns

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Acknowledgments

- Material-UI for the component library
- Recharts for the charting library
- React for the frontend framework
"# forntend" 
