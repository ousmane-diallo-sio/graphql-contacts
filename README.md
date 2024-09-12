# ContactApp - A Mobile Contact Manager with GraphQL Backend

## Project Overview

**ContactApp** is a simple mobile application designed to manage and track contacts, built using **Flutter** for the mobile front-end and **ExpressJS** for the back-end. The purpose of this project is to demonstrate a solid understanding of **GraphQL** by using it for querying, mutations, and subscriptions. The app allows users to add, edit, and delete contacts, with real-time updates via GraphQL subscriptions.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [GraphQL Features Used](#graphql-features-used)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

### Contact Management:
- Add, edit, and delete contacts.
- Sync contacts between the mobile app and the server.

### Real-Time Updates:
- Whenever a contact is added, updated, or deleted, all clients connected to the app will receive real-time updates via GraphQL subscriptions.

### Contact Details:
- View detailed contact information such as name, phone number, and email.

### Search Functionality:
- Users can search for contacts by name.


## Tech Stack

### Front-End:
- **Flutter**: Cross-platform framework for building the mobile application.
- **Dart**: Programming language used for Flutter.

### Back-End:
- **Express.js**
- **PostgreSQL**

## GraphQL Features Used

### Queries:
- Fetch a list of contacts.
- Fetch details of a single contact by ID.

### Mutations:
- Add a new contact.
- Update an existing contact.
- Delete a contact.

### Subscriptions:
- Subscribe to real-time updates when contacts are added, updated, or deleted.
- Ensure all connected clients are always in sync with the latest contact list.