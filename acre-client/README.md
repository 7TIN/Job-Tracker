# Job Tracker Web Application

<!-- ![Job Tracker Dashboard](httpshttps://i.imgur.com/your-screenshot-url.png)  -->

A modern, full-stack web application designed to streamline the job application process. This platform allows users to manage their job applications in a dynamic, spreadsheet-like interface with a powerful backend and a secure authentication system. The ultimate goal is to pair this web app with a browser extension that automatically captures and saves job application data.

---

## Features

* **Secure User Authentication**: Complete user management system using **Supabase Auth**, including email/password login, Google OAuth, and password reset functionality.
* **Dynamic Data Grid**: A spreadsheet-like interface for managing job applications, built with **AG Grid**.
* **Full CRUD Functionality**: Users can create, read, update, and delete their job applications directly within the grid.
* **Real-time UI Updates**: A responsive user interface with toast notifications for a smooth user experience.
* **Separate Admin Panel**: A secure, separate login and dashboard for application administrators.
* **Robust Backend**: Built with **Next.js App Router**, Server Actions, and a type-safe **Prisma** ORM.
* **Row Level Security (RLS)**: Database-level security ensuring users can only access their own data.

---

## Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Database**: [Supabase](https://supabase.io/) (PostgreSQL)
* **ORM**: [Prisma](https://www.prisma.io/)
* **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth) (Users) & Custom JWT (Admin)
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
* **Data Grid**: [AG Grid](https://www.ag-grid.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Form Management**: [React Hook Form](https://react-hook-form.com/)
* **Validation**: [Zod](https://zod.dev/)
* **Package Manager**: [pnpm](https://pnpm.io/)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later)
* pnpm (`npm install -g pnpm`)
* A Supabase account

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/7TIN/Job-Tracker.git](https://github.com/7TIN/Job-Tracker.git)
    cd acre-client
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up your Supabase project:**
    * Create a new project on [Supabase](https://supabase.io/).
    * Go to **Project Settings** > **Database** and copy the **Connection string** (URI tab). You will need the one compatible with Prisma.

4.  **Set up environment variables:**
    * Create a new file named `.env` in the root of the `acre-client` directory.
    * Copy the contents of `.env.example` (or the template below) into your new `.env` file.
    * Fill in the required values from your Supabase project dashboard.

    **`.env` Template:**
    ```env
    # Supabase Connection String (for Prisma)
    # Get this from your Supabase Dashboard > Project Settings > Database > Connection string
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres"

    # Supabase Public Keys (for frontend client)
    # Get these from your Supabase Dashboard > Project Settings > API
    NEXT_PUBLIC_SUPABASE_URL="[https://your-project-ref.supabase.co](https://your-project-ref.supabase.co)"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

    # Secret for Admin JWT Session
    # Generate a long, random string (e.g., using a password manager or `openssl rand -base64 32`)
    JWT_SECRET="your-super-secret-jwt-string"

5.  **Run database migrations:**
    * This command will read your `prisma/schema.prisma` file and create the `users`, `jobs`, and `Admin` tables in your Supabase database.
    ```bash
    pnpm prisma migrate dev
    ```

6.  **Set up the Supabase User Sync Trigger:**
    * Go to the **SQL Editor** in your Supabase dashboard.
    * Run the SQL script found in `prisma/migrations/user_trigger.sql` (or copy the script below) to create the trigger that syncs `auth.users` with `public.users`.

7.  **Create your Admin User:**
    * Follow the instructions in the "Admin Setup" section below.

8.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Admin Setup

The admin panel uses a separate authentication system. To create your first admin:

1.  **Hash Your Password:**
    * Run the `hash-password.js` script in the root of the project to generate a secure hash of your desired password.
    ```bash
    node hash-password.js
    ```
    * Copy the resulting hash string.

2.  **Insert into Database:**
    * Go to the **Table Editor** in your Supabase dashboard and select the `Admin` table.
    * Click "Insert row" and fill in your details:
        * `email`: your admin email
        * `passwordHash`: the hashed password you just copied
        * `role`: `SUPER_ADMIN`

You can now log in at `/admin/login`.

---

## Future Work

* **Browser Extension**: Develop a Chrome/Firefox extension to automatically parse job application data from popular job boards (LinkedIn, Indeed, etc.) and send it to the web application via a secure API endpoint.

---

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.



