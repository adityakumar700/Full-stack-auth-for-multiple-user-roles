# Next.js Authentication System with TypeScript

## Assignment Submission

*Student*: Aditya kumar  
*Date*: 16/06/25  

## Technology Stack
- *Framework*: Next.js 14 (App Router)
- *Language*: TypeScript
- *Database*: MongoDB (Mongoose ODM)
- *Authentication*: JWT with HTTP-only cookies
- *Styling*: Tailwind CSS
- *Deployment*: Vercel (optional)

## Key Features Implemented
| Feature | Implementation Details |
|---------|------------------------|
| User Authentication | JWT tokens with 1-hour expiry |
| Password Security | bcrypt hashing (10 rounds) |
| Role-Based Access | Admin & User roles |
| Protected Routes | Next.js middleware |
| API Endpoints | Type-safe API routes |
| Form Validation | Client-side validation |

## Project Structure

src/
├── app/
│   |   |
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   ├── signup/
│   │   │   ├── page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   ├── api/users
│   │   ├── /
│   │   │   ├── login/
│   │   │   │   ├── route.ts
│   │   │   ├── signup/
│   │   │   │   ├── route.ts
│   │   │   ├── verify/
│   │   │   │   ├── route.ts
├── dbconfig/
│   ├── db.ts
├── models/
│   ├── User.ts
|--helpers/
|   |-auth.ts
|---types/
|    |-auth.ts
└── middleware.ts

## module packages

npm install mongoose bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
