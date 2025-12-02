## 🎵 Music Club Website

The Music Club Website Project is something that I built as the President of the Music Club for members of the music club community.

You can test the production on: https://musicclubwebsite-frontend.onrender.com/
(It may take a while to work properly because I am using Render's free plan)

### The Music Club Website was designed to:

* Give the Carleton Music Club its own platform
* Showcase upcoming events
* Showcase an executive roster
* Communicate instructions on how to get involved

## Tech Stack

This is a full-stack application that I built.

**Frontend:**
* React
* Vite
  
**Backend:**
* MongoDB
* Node.js
* Express
* Cloudflare R2
  
## Tech Stack Explained

**Frontend – React & Vite**

* My front-end build tool is Vite. I chose Vite because not only is it fast for local development, it bundles my react code for efficiency, supports modern JS features, and saves me from writing complex build configs.

* I chose to use **React** because it is a popular frontend library that allows code to be dynamic, modular, interactuve, and maintainable.
  
**Backend – Node.js, Express & MongoDB**

* **Node.js** is the runtime environment. Doing this allows me to handle HTTP requests, authentication, and event management in JS.

* **Express** handles the server framework that routes my GET and POST requests.
For example, my express route POST /events, allows authenticated users to create new events, uploading the information to the R2 bucket and MongoDB.

* **MongoDB** stores our event and executive data. Each event is a document in MongoDB, which makes it easy to query, sort, and display on the frontend.

* **Cloudflare R2** is used as object storage for images and media. When an authenticated user uploads an event image or an executive image, it uses the POST /upload route, which handles uploads using Multer and Cloudflare R2.

## Cybersecurity

I use a variety of packages and services to handle security on this application.

* **bcrypt** is used to hash admin passwords, ensuring safe login handling.

* **JWT (JSON Web Tokens)** is used to provide secure authentication, so only authorized users can create or manage events or executive data.

* **CORS** configuration ensures that only the frontend can call my API.
