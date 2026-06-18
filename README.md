# 🎓 Placement-Management-System

Placement-Management-System is a fully functional web application designed to streamline the campus placement process. Built using **React**, **TypeScript**, **Firebase**, **Tailwind CSS**, and **Framer Motion**, it ensures smooth interaction between **students**, **recruiters**, and **admins**—with robust role-based access and approval logic.

### Project Note

This project is part of one of my freelance projects for a final-year B.Tech student and was built using Tailwind CSS, React.js, Typescript and Firebase.

**📄 Full Project Documentation:** For complete details on the project, tech stack and architecture, please refer to the `project_info.md` file located in the root directory of this repository.

---

## Quick Start / Installation

To run this project locally, follow these steps:

### 1. Install Dependencies

Clone the repository, navigate into the directory, and install the required packages:

```bash
pnpm install
```

### 2. Setup Firebase Environment Variables

You must manually create a file named exactly `.env` in the root folder of this project. Inside that `.env` file, add your Firebase API key exactly like this:

```env
VITE_Firebase_API_KEY="your-real-firebase-api-key-goes-here"
```

*(Note: You must also open `src/backend/FirebaseConfig.ts` and replace the placeholder values for `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, and `appId` with your own Firebase project settings!)*

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_API_KEY,
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 3. Create the First Admin Account

Since this platform strictly uses an Admin-first approach, **you must manually create the first admin account** directly inside Firebase before anyone can log in or use the platform.

Follow these steps exactly:

1. **Create the Auth User:**
   - Go to your Firebase project and open the **Authentication** tab.
   - Click "Add user", and enter an email and password for your admin.
   - Once created, copy that user's generated **User UID** (a long string like `aB1cD2...`).
2. **Navigate to the Firestore Database tab in Firebase:**
   - Click **Start collection** and name it `admins` (if it doesn't already exist).
   - Click **Add document**.
   - For the **Document ID**, select **Auto-ID**.
   - Add the following three fields exactly as written:
     - **Field:** `uid` | **Type:** `string` | **Value:** _(Paste the UID you copied in step 1)_
     - **Field:** `email` | **Type:** `string` | **Value:** _(The admin's email address)_
     - **Field:** `status` | **Type:** `string` | **Value:** `active`
3. Click **Save**. You can now log into the web application using that email and password!

### 4. Run the Development Server

Start the Vite development server:

```bash
pnpm run dev
```

---

## 👨‍💻 Features

- 👨‍🎓 **Student Module**
  - Students can **log in** and **apply for job postings** after their accounts are created and approved **by the admin**.
  - Students **cannot self-register**—only admins can create their accounts.

- 🧑‍💼 **Recruiter Module**
  - Recruiters can post jobs for students once their accounts are **created by the admin**.
  - Recruiters **cannot create their own accounts**—admin approval and creation is required.

- 🛡️ **Admin Module**
  - Full access to the system.
  - **Only the admin can create new student and recruiter accounts.**
  - Can **ban**, **delete**, or **manage** any user.
  - Controls the overall platform integrity and security.

---

## 🧰 Technologies Used

- ⚛️ React (with TypeScript) – Scalable, typed frontend framework
- 🔥 Firebase – Authentication, database, and hosting
- 🎨 Tailwind CSS – For beautiful and responsive UI
- 💫 Framer Motion – For smooth animations and transitions

---

## 🔐 Access Control Logic

| Role      | Permission                                              |
| --------- | ------------------------------------------------------- |
| Student   | Login, view/apply jobs (after admin creates account)    |
| Recruiter | Post/manage jobs (after admin creates account)          |
| Admin     | Full control: **create accounts**, approve, delete, ban |

---

## 🤝 Contributing

Want to improve this system or fix a bug? Feel free to open an issue or submit a pull request. Contributions are welcome.
