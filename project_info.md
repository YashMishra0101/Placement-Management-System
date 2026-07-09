# Project Information: Placement Management System

This document provides a real, accurate, and comprehensive overview of the Placement Management System codebase, its tech stack, features, and operational workflow based strictly on the current code architecture.

---

## 💻 Tech Stack

### Frontend Core
- **React (v19)**: The core UI library used for building the component-based architecture.
- **TypeScript**: Used throughout the project to provide static typing and improve code reliability.
- **Vite**: The blazing-fast build tool and development server powering the project.
- **React Router DOM (v7)**: Handles client-side routing, enabling navigation without page reloads.

### Styling & UI
- **Tailwind CSS (v4)**: The utility-first CSS framework used for all styling and responsive design.
- **Framer Motion**: Powers the smooth, complex animations and page transitions.
- **Radix UI**: Provides headless, accessible UI primitives (dialogs, dropdowns, tooltips, etc.) used to build custom components.
- **Lucide React & React Icons**: Provide the SVG iconography used throughout the application.
- **@tsparticles/react**: Powers the interactive, animated particle backgrounds seen on the landing page.

### Backend (Firebase)
- **Firebase Authentication**: Handles secure user login and session management (Email & Password).
- **Firebase Cloud Firestore**: The NoSQL database used to store application data across distinct collections (`students`, `recruiters`, `admins`).

### Forms & Validation
- **React Hook Form**: Manages form state and submissions efficiently.
- **Zod**: Used in tandem with React Hook Form for strict, schema-based form validation.

### Utilities
- **Sonner / React Hot Toast**: Handles in-app toast notifications for user feedback (e.g., "Login Successful").
- **Recharts**: Used for rendering data visualizations and charts in the dashboards.

---

## ⚙️ How the Project Works (Workflow)

The platform operates on a strict **Admin-First, Role-Based Access Control (RBAC)** architecture. 

### 1. Authentication & Role Resolution
When a user logs in via the `/login` page:
1. `AuthService.ts` authenticates the credentials against Firebase Auth.
2. It then queries the Firestore database across three collections (`students`, `recruiters`, `admins`) using the authenticated user's UID.
3. Depending on which collection the UID is found in, the user is assigned a specific role (`student`, `recruiter`, or `admin`).
4. The system navigates the user to their respective dashboard/portal.

### 2. Route Protection
Security is enforced on the frontend via the `ProtectedRoute.tsx` component. This component intercepts navigation attempts:
- If a user tries to access a route they do not have permission for (e.g., a student trying to access the `/dashboard` admin page), they are immediately redirected to the `/unauthorized` page.

### 3. The Core Modules
* **Admin Module (`/dashboard`)**:
  - Requires the `admin` role.
  - Because students and recruiters cannot self-register, the Admin is solely responsible for creating and managing these accounts from this panel.
* **Recruiter Module (`/recruiterjobpostpage`)**:
  - Requires the `recruiter` role.
  - Allows company representatives to create and manage job postings for the students.
* **Student Module (`/joblistingspage`)**:
  - Requires the `student` role.
  - Allows students to view available job openings, see their application status, and manage their profiles.

---

## ✨ Key Features Explained

### 🛡️ Smart Security & Access Management
* **Closed-Ecosystem Registration**: To maintain strict security and prevent unauthorized access, open registration is disabled. The college administration (Admins) must verify and manually provision accounts for all students and recruiters.
* **Automated Role Resolution**: Upon logging in, users are seamlessly authenticated without needing to manually specify their account type. The system queries the secure database to automatically determine if the user is a student, recruiter, or admin, and routes them directly to their respective portal.

### 🎓 For Students
* **Centralized Job Portal**: Students are provided with a dedicated "Job Listings" interface where they can browse all active opportunities posted by partnering organizations.
* **Application Tracking**: A streamlined interface allows students to review job descriptions, view salary ranges, check specific requirements, and seamlessly apply for roles in one centralized location.

### 🏢 For Recruiters
* **Exclusive Employer Portal**: Verified recruiters are granted access to a private dashboard tailored for talent acquisition. Here, they can efficiently draft, publish, and manage comprehensive job postings.
* **Direct Access to Talent**: This system allows companies to directly reach the college's verified student body, ensuring high-quality applications without the noise of a public job board.

### 👑 For Admins (College Administration)
* **Administrative Dashboard**: Serving as the centralized control panel, the admin dashboard provides a complete overview of the platform's user base, including both registered students and corporate recruiters.
* **Complete System Authority**: Administrators possess total control over account lifecycle management. They can instantly provision accounts for incoming student cohorts or new corporate partners, as well as suspend or remove outdated accounts to maintain a clean database.

### 🎨 Modern User Experience
* **Context-Aware Navigation**: The application features a dynamic navigation bar that adapts to the authenticated user. For instance, administrative options are exclusively visible to admins, ensuring an uncluttered interface for students and recruiters.
* **Premium Aesthetic Design**: The platform utilizes modern web design principles like "Glassmorphism" (frosted-glass UI components), fluid page transitions, and subtle interactive backgrounds. This ensures the application feels professional, responsive, and engaging to use.
