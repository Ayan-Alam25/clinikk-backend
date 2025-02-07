# Project Description

The Clinikk TV Backend Service allows users to upload, manage, and retrieve health-related media content (videos and audio). It provides secure access to media content using JWT-based authentication and stores media files in Cloudinary.

## Setup

### Backend

1. Navigate to the backend directory and install the backend dependencies:

   ```sh
   cd clinikk-backend
   npm install
   ```

2. Create a `.env` file in the backend directory and add the following environment variables:

   ```sh
   PORT=5000
   MONGODB_URI=
   JWT_SECRET=
   CLOUD_NAME=
   CLOUD_API_KEY=
   CLOUD_API_SECRET=
   ```

3. Start the backend server:

   ```sh
   node server.js
   ```

### Running the Application

Once the backend server is running, you can access the API at:

   ```sh
   http://localhost:5000
   ```


## Key Features

- **Media Upload:** Upload health-related media files (videos and audio) to Cloudinary.
- **Media Management:** Retrieve a list of uploaded media.
- **Authentication:** Secure API endpoints using JWT-based authentication.


## Tech Stack

- **Backend:** Node.js, Express
- **Media Storage:** Cloudinary
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JSON Web Tokens (JWT)

## Future Enchancements

1. **AWS S3 Integration:** Replace Cloudinary with AWS S3 for media storage to leverage scalable and cost-effective cloud storage.
2. **User Authentication:** Implement a full user authentication system with roles (e.g., admin, subscriber).
3. **Pagination and Filtering:** Add pagination and filtering for media listings.