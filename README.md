# User Management Application

A React application that integrates with the Reqres API to perform basic user management functions including authentication, listing users, and editing/deleting user information.

![User Management App Screenshot](screenshot.png)

## Features

- **Authentication**: Secure login with JWT token storage
- **User Management**: View, edit, and delete users
- **Pagination**: Navigate through multiple pages of users
- **Search Functionality**: Filter users by name or email
- **Responsive Design**: Works on both desktop and mobile devices
- **Form Validation**: Input validation for login and edit forms
- **Toast Notifications**: User-friendly success and error messages

## Technologies Used

- React 18
- React Router v6 for navigation
- Axios for API requests
- React Toastify for notifications
- Custom CSS for styling

## Installation and Setup

1. **Clone the repository**
   ```
   git clone https://github.com/katariaNandini/User-Management-App.git
   cd User-Management-App
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start the development server**
   ```
   npm start
   ```

4. **Open your browser**
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage Guide

### Login

- Use the following credentials to log in:
  - Email: eve.holt@reqres.in
  - Password: cityslicka

### Users List

- After logging in, you'll see a list of users
- Use the search bar to filter users by name or email
- Navigate between pages using the pagination controls
- Click "Edit" to modify a user's details
- Click "Delete" to remove a user

### Edit User

- Update the user's first name, last name, and email
- Click "Save Changes" to update the user information
- Click "Cancel" to return to the users list without saving

## API Integration

This application integrates with the [Reqres API](https://reqres.in/) with the following endpoints:

- **POST /api/login** - User authentication
- **GET /api/users?page={page}** - Fetch paginated user data
- **PUT /api/users/{id}** - Update user information
- **DELETE /api/users/{id}** - Delete a user

## Implementation Details

- **Authentication**: JWT token stored in localStorage for persistence
- **Protected Routes**: Unauthorized users are redirected to the login page
- **Error Handling**: API errors are caught and displayed to the user
- **Form Validation**: Client-side validation for all input fields
- **Responsive Design**: Flexbox and CSS Grid for layout

## Future Improvements

- Add unit and integration tests
- Implement user registration functionality
- Add more advanced filtering and sorting options
- Implement dark mode theme

