# Memories

Getting Old!!! no problem Memory is an app that allows users to keep a journal of important memories. Users will be able to post their memories with images of the events as well as some notes with their thoughts.

## Site Preview
![Preview of Memories site](https://res.cloudinary.com/dazgyyyvj/image/upload/v1665618623/seir-808-p3/Screenshot_from_2022-10-12_16-49-37_nah6bk.png)
[Check it out here!](https://superb-parfait-91c6b9.netlify.app/)

## Installation Instructions
If you would like to use this app locally, feel free to follow these instructions:
1. fork and clone this repo
2. open a terminal and cd to the directory you cloned the repo into
3. run `npm install` to install all dependencies
4. touch a `.env` file and add the following lines to it
    - `JWT_SECRET=[your secret]` with whatever secret you'd like
    - `PORT=XXXX` if you'd like to run the server on a port other than 3001
    - `CLOUDINARY_URL=[API Environment variable]` to hook up your personal cloudinary account.
        - [create a free account here](https://cloudinary.com/) and afterwards, you can find your API env var in your dashboard near the top left of your profile page
5. run `node .` or `nodemon` to fire up the server
6. If you haven't already, [follow these instructions to set up the client](https://github.com/JamesOnwordi/memories_client)
7. If you have the client

## Tech Used
### Backend (you are here)
- express and node to run our server
- mongodb and mongoose for our database and ODM
- Cloudinary API to allow users to upload photos and save them to their memories

### Frontend
- React for rendering components onto a single page web app
- Tailwind as our CSS framework
- axios to make requests to our backend server

## Approach Taken
please fill me out

## MVP User Stories
- [x] As an unregistered user, I would like to sign up with email and password.
- [x] As a registered user, I would like to log in with email and password.
- [x] As a logged in user, I would like to log out.
- [x] As a logged in user, I would like to create memory posts.
- [x] As a logged in user, I would like to see all my posts.
- [x] As a logged in user, I would like to see details on a specific post.
- [x] As a logged in user, I would like to update my posts.
- [x] As a logged in user, I would like to delete my posts.

## Stretch User Stories
- [ ] As a logged in user, I would like to associate my posts with other users.
- [ ] As a logged in user, I would like to leave comments on posts I've been associated with.
- [ ] As a logged in user, I would like to upload a profile picture.
- [ ] As a logged in user, I would like to mark posts as a favorite.
- [ ] As a logged in user, I would like to view my favorite posts

## ERDs
![Project 3 ERDs](https://res.cloudinary.com/dazgyyyvj/image/upload/v1665617908/seir-808-p3/project3erd_coljkd.png)

## RESTful Routing Chart
| METHOD | ACTION | CRUD | DESCRIPTION |
|--------|--------|------|-------------|
| POST | /users/new | CREATE | signing up a user |
| POST | /users/login | | logging in a user |
| GET | /memories | READ | fetch all of a users memories |
| GET | /memories/:id | READ | fetch a specific memory and it's comments |
| POST | /memories | CREATE | create a new memory |
| PUT | /memories/:id | UPDATE | update a specific memory |
| DELETE | /memories/:id | DESTROY | delete a specific memory |
| POST | memories/:id/comments | CREATE | create a comment on a memory |
| PUT | memories/:id/comments/:cId | UPDATE | update a specific comment |
| DELETE | memories/:id/comments/:cId | DESTROY | delete a specific comment |

## Wireframes
![Project 3 Wireframes](https://res.cloudinary.com/dazgyyyvj/image/upload/v1665617625/seir-808-p3/p3-wireframe_awfc8z.png)
