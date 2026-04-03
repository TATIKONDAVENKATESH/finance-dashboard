# Finance Dashboard

## Overview
A responsive finance dashboard built using React to track transactions, view summaries, and understand spending patterns.

## Features

- Dashboard:
  - Total balance
  - Income and expense summary
  - Charts (trend + category breakdown)

- Transactions:
  - View transactions
  - Search by category
  - Sort by date and amount
  - Add / edit / delete (admin role)

- Role-based UI:
  - Viewer → read-only
  - Admin → full access

- Insights:
  - Highest spending category
  - Monthly comparison

- Other:
  - LocalStorage persistence
  - CSV export
  - Toast notifications
  - Confirm delete modal


## Tech Stack

- React (Vite)
- Tailwind CSS
- Recharts
- Context API
- lucide-react

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
