This project is a React.js application that fetches data from an API using Axios and displays it in two separate lists. Users can seamlessly move items between these lists using arrow buttons, 
enabling an interactive data transfer experience. The application is built with React hooks (useState, useEffect) for state management and API integration, ensuring smooth functionality and performance. 
The UI is designed to be simple, responsive, and user-friendly.

Key Features
Fetches data from an API using Axios.
Displays two lists with dynamically loaded data.
Enables users to transfer items between the lists using arrow buttons.
Fully responsive and optimized for a seamless user experience.
Installation & Setup
To set up and run the project locally, follow these steps:

Clone the repository:
bash
Copy
Edit
git clone (https://github.com/SanketShinde23/list-management)
cd your-repository
Install dependencies:
bash
Copy
Edit
npm install  
Start the application:
bash
Copy
Edit
npm start  
Project Structure
The project follows a modular structure with reusable components for maintainability. The key files include:

/src/components/List.js – Renders the list and handles item rendering.
/src/components/ListItem.js – Represents an individual item in the list.
/src/App.js – Manages state and logic for item transfers.
/src/index.js – Entry point of the application.
/src/styles.css – Contains all styling for the application.
How It Works
When the application starts, it fetches data from the provided API and populates List 1 with the received items. 
Users can move items from List 1 to List 2 and vice versa using arrow buttons placed between the lists. The changes are updated in real-time, making the interaction smooth and intuitive.

Technologies Used
React.js – Frontend library for building UI components.
Axios – To fetch data from the API.
CSS – For styling and responsiveness.
