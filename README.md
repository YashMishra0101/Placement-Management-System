# 🎓 Placement-Management-System

Placement-Management-System** is a fully functional web application designed to streamline the campus placement process. Built using **React**, **TypeScript**, **Firebase**, **Tailwind CSS**, and **Framer Motion**, it ensures smooth interaction between **students**, **recruiters**, and **admins**—with robust role-based access and approval logic.

---

## 👨‍💻 Features

* 👨‍🎓 **Student Module**

  * Students can **log in** and **apply for job postings** after their accounts are created and approved **by the admin**.
  * Students **cannot self-register**—only admins can create their accounts.

* 🧑‍💼 **Recruiter Module**

  * Recruiters can post jobs for students once their accounts are **created by the admin**.
  * Recruiters **cannot create their own accounts**—admin approval and creation is required.

* 🛡️ **Admin Module**

  * Full access to the system.
  * **Only the admin can create new student and recruiter accounts.**
  * Can **ban**, **delete**, or **manage** any user.
  * Controls the overall platform integrity and security.

---

## 🧰 Technologies Used

* ⚛️ React (with TypeScript) – Scalable, typed frontend framework
* 🔥 Firebase – Authentication, database, and hosting
* 🎨 Tailwind CSS – For beautiful and responsive UI
* 💫 Framer Motion – For smooth animations and transitions

---

## 🌐 Project Demo 

To see a live demo of the project, please visit :https://placement-management-system-five.vercel.app/

---

## 🔐 Access Control Logic

| Role      | Permission                                              |
| --------- | ------------------------------------------------------- |
| Student   | Login, view/apply jobs (after admin creates account)    |
| Recruiter | Post/manage jobs (after admin creates account)          |
| Admin     | Full control: **create accounts**, approve, delete, ban |

---

## 🤝 Contributing

Wanna improve this system or fix a bug? Feel free to open an issue or submit a pull request. Contributions are welcome and appreciated! 💙

---

## 📬 Contact

For queries, suggestions, or just to say hi:

* 🔗 LinkedIn: [Yash Mishra](https://www.linkedin.com/in/yash-mishra-356280223)
* 🐦 Twitter: [@YashRKMishra1](https://twitter.com/YashRKMishra1)

