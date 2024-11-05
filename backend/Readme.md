# UGC

### Project Architecture

This project provides a REST API built with Node.js and TypeScript for generating scripts based on user-defined keywords, tone, and age group. Users can bookmark the generated scripts for easy access, and the application also provides insights into the latest trends related to the generated content.

- **Backend:** Built with Node.js and Express, utilizing.
  TypeScript for added type safety.

- **Database:** Leveraging MongoDB Atlas and Mongoose for efficient data management.

---

## Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** – The runtime environment for executing JavaScript on the server.

2. **npm** – The package manager for managing dependencies.

### Technologies Used

1. **Backend:** Node.js with Express (TypeScript)

2. **Database:** MongoDB with Mongoose

---

## Starting Project

1. **Create an env file and add your env variables**

   1. MONGO_URI
   2. PORT
   3. JWT_SECRET
   4. SERP_API
   5. GEMINI_API_KEY

2. **Run Command**

   ```bash
   npm run dev
   ```
