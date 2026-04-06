# Finance Dashboard

## Overview
## Overview
A responsive finance dashboard built using React to track transactions, visualize financial data, and provide actionable insights into spending behavior.

## Features

- Dashboard:
  - Total balance, income, and expenses
  - Trend chart (time-based)
  - Category breakdown (pie chart)

- Transactions:
  - View all transactions
  - Search and filter by category/type
  - Sort by date and amount
  - Add / edit / delete (admin only)

- Role-based UI:
  - Viewer → read-only
  - Admin → full CRUD access

- Insights:
  - Highest spending category
  - Monthly income vs expense comparison

- Other:
  - LocalStorage persistence
  - CSV export
  - Toast notifications
  - Delete confirmation modal


## State Management

- Managed using React Context API
- Handles:
  - Transactions data
  - Filters and search
  - User role
  - UI state (modals, theme)


## Tech Stack

- React (Vite)
- Tailwind CSS
- Recharts
- Lucide React

## Live Website URL
- https://finance-dashboard-two-beige.vercel.app/

## Setup

- git clone <repo-link>
- cd finance-dashboard
- npm install
- npm run dev

## Role Simulation
- Viewer → Read-only
- Admin → Can do CRUD transactions


## UX Considerations

- Responsive across devices
- Handles empty states gracefully
- Smooth theme transitions (light/dark)