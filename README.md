# CS50 Web Programming Final Project
***

For my final project I decided to create an e-learning site that will benefit students of all ages, espically during tough times like these(coronavirus). People will be able to access the website and create an account. From there they can access learning material for different subjects and chat with others to deepen their understanding or just relax and chill with them. There is also a forum for people to ask questions and get help from their peers and a quiz page to test their knowledge on the material they learned.

The website is built using Django/Python for the backend and HTML/CSS and Javascript for the front-end. The website is then deployed on Heroku for everyone to access.

The project consists of 12 HTML pages, 3 main js files, 6 model schemas and links to 14 paths including 3 API routes.

### Models
There is 6 model schemas used in this website. First is the User model, which is used for authentication, keeping track of user accounts. The second Quiz_Questions is used to store the quiz question and the answer. The third Quiz_MCAnswers is used to store the different multiple choice options for each question. Fourth we got the Forum model, which stores the forum topics and body descriptions. Fifth we have the Discussion model which stores the post made by other users to the corresponding Forum post. Last we have the LearningMaterial model which stores the different subjects and content.

### Layout/Template

This is the layout.html file
The Layout consists of the top navbar which contains links to the learning, forum, and quiz pages, as well as a logout option and the username of the user if the user is logged in. If the user is logged off a login or register button replaced those. It also includes a footer bar consisting of an solution, about, and contact page.

A free bootstrap template from https://startbootstrap.com/template/scrolling-nav was used to create most of the css styling.

### Landing Page

This is the index.html file
The Landing page consists of a hero image, call to action, details on why students should sign up and benefits of using the website. It is used to draw users in.

A free bootstrap template from https://startbootstrap.com/theme/landing-page was used to create most of the css styling for this page

### solution, about, contact

This is the about.html, contact.html and solution.html pages
Theses pages are built solely using html, just to provide users with additional information about the creator and my vision and a way to get in contact

### Register

This is the register.html page
Users will use this page to create their account to access the rest of the site. This page consist of a form for the user to enter a username, email address and password. Once confirmed a new entry would be added to the User model.

### Login

This is the login.html page
Users will use this page to login to their account if they have one. This page consist of a form for the user to enter their username and password. The system will check for the corresponding username and password in the model and authenticate the user if it is correct.

### Learning and Chatroom

This is the learn.html and chatroom.js files
For the chatroom a third party API from scaledrone is used connect users to the chatroom and send and recieve messages from other users. The DOM is updated when new messages are recieved. This page also consist of learning material for the users which involve getting all the entries from the LearningMaterials model and displaying them on this page.

### Forum
This is the forum.html,addInForum.html, and forumPost.html and forum.js files
Here the user can see all the opened forum post that other users have opened, they can choose to open a new forum post, which brings them to a new page, where they can fill out a form consisting of the topic and the description. They can also click on an existing forum post and see the additional post made for that post or add their own reply to the topic.

### Quiz
This is the quiz.html and quiz.js files
Here the user is shown multiple questions, where they can answer to check their knowledge on what they learned. Pagination is used here to display one question at a time, once users answered a question they can choose check to see if they got it correct. If it is correct the text will highlight green if not it will be red. They can then iterate over all the available questions using the next and prev button.