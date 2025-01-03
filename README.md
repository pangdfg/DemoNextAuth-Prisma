# Next.js + NextAuth + Prisma Authentication

This project sets up user authentication in a Next.js application using NextAuth for local login, backed by Prisma for the database.

> [!NOTE]
> [here](https://github.com/pangdfg/DemoNextAuth-Prisma/tree/add-google) for social Login with google

## Features
 - Local Login : Users can sign in using their email and password.
 - Prisma ORM: Database interaction for managing users and sessions.

## Prerequisites

 - Node.js (v16 or higher)
 - npm or yarn
 - Docker destop


## Getting Started

1. open docker andrun docker-compose:
```bash
docker-compose up --build -d
```
2. set up prisma and node_modules:
 ```bash
npm i
npx prisma migrate dev --name add-account
```
3. add .env file ref for .env.example
4. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Conclusion

You now have a Next.js app with NextAuth integrated for local authentication login. You can also use Prisma for managing your user and session data.
