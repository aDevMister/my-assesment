

# React Dashboard

This project is a simple React dashboard where you can see, add, update and delete user information. It pulls data from an API and lets you manage users easily. The dashboard also supports sorting, searching and pagination.

## Features

- Fetch user data from an API
- Add, update, and delete users
- Search for users by name
- Sort users by name
- Pagination to view users in chunks

## Tech Stack

- **React**: For building the user interface.
- **Styled Components**: To style the components.
- **Axios**: For making API requests.
- **Zustand**: For state management.

## How to Set It Up

1. Clone the repo:

```bash
git clone https://github.com/yourusername/react-dashboard.git
cd react-dashboard
```

2. Install the required packages:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

Now the app should be running on `http://localhost:3000`.

## How the App Works

- **Fetch Users**: When you open the app, it fetches a list of users from the API (`https://jsonplaceholder.typicode.com/users`) and stores them in state.
  
- **Add a User**: You can add a new user by entering their name and email. The app will send a POST request to the API to save the new user.
  
- **Update a User**: You can edit a user by clicking on their info, changing it, and sending a PUT request to update the details.
  
- **Delete a User**: If you want to remove a user, just click the delete button beside their name, and it sends a DELETE request to the API.

- **Pagination**: The user list is split into pages, with 5 users per page. You can switch between pages using the pagination buttons.

- **Search and Sort**: You can search for users by name. Also, the users can be sorted alphabetically in ascending or descending order by clicking the sort button.

## How to Customize

If you want to change or improve this dashboard:

1. You can use your own API instead of the one provided.
2. You can add more fields to the user model.
3. You can add other features, like advanced filtering or sorting by other criteria.

## Contributing

Feel free to fork the repo and send a pull request if you have any suggestions or fixes. If you find any issues, please open a new issue in the repo.

---

This version is in simple Nigerian English and keeps the tone friendly and easy to understand. Feel free to tweak it further if needed!

