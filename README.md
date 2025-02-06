
# React Dashboard

This project is a simple React dashboard where you can view, add, update, and delete user information. The dashboard fetches data from an API and allows you to easily manage users. It also supports sorting, searching, and pagination.

## Features

- Fetch user data from an API
- Add, update, and delete users
- Search for users by name
- Sort users by name
- Pagination to view users in pages

## Tech Stack

- **React**: Used for building the user interface.
- **Styled Components**: For styling the components.
- **Axios**: For making API requests.
- **Zustand**: For state management (managing app data).

## How to Set It Up

1. Clone the repo to your computer:

```bash
git clone https://github.com/aDevMister/my-assesment.git

```

2. Install the required packages:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

After running `npm start`, the app will be available at `http://localhost:3000`.

## How the App Works

- **Fetch Users**: When you open the app, it fetches a list of users from the API (`https://jsonplaceholder.typicode.com/users`) and stores the data in the app's state.

- **Add a User**: You can add a new user by entering their name and email. The app will send a POST request to save the new user in the API.

- **Update a User**: You can edit a user by clicking on their information, making changes, and the app will send a PUT request to update their details.

- **Delete a User**: To delete a user, just click the delete button next to their name. It will send a DELETE request to remove the user.

- **Pagination**: The user list is divided into pages, showing 5 users per page. You can switch between pages using the pagination buttons.

- **Search and Sort**: You can search for users by their name, and you can sort the users alphabetically by clicking the sort button.

