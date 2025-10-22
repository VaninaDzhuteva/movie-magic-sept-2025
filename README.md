# movie-magic-sept-2025
SoftUni JS Back-End Workshop

## Workshop 1 - Express and Templating

### Development steps

- [x] Initialize project
- [x] Add Expres Server
- [x] Config debugging
- [x] Add workshop resources
- [x] Setup Handlebars
- [x] Setup static files
- [x] Render Home page
- [x] Add Layout
- [x] Render About Page

### Architecture and dynamic rendering
- [x] Add home controller
- [x] Add movie data layer
- [x] Add movie service
- [x] Render movies on home page
- [x] Show no movies screen

### Create movie
- [x] Add Movie Controller
- [x] Create Movie page
- [x] Add routes
- [x] Add 404
- [x] Abolity to parse user data
- [x] Create Movie
    - [x] Add action
    - [x] Add service
    - [x] Add model method for creating movie
- [x] Redirect after movie creation
- [x] Add unique id for each created movie

### Details page
- [x] Add navigation button for detail page
- [x] Add route with param for details page
- [x] Getone movie from service
- [x] Find movie by id from model
- [x] Render details page with dynamic data

### Search page
- [x] Show static search page
- [x] Render all movies
- [x] Modify search form
- [x] Filter movies
- [ ] Remember search words

### Bonuses
- [x] Dynamic title page
- [x] Files Persistance
- [x] Rating

---

## Workshop 2 - MongoDB Database

### Prerequisities
- [x] Install MongoDB Community Server
- [x] Install Compass GUI
- [x] Install Mongosh CLI (Optional)

### Setup
- [x] Install mongoose and connect to DB

### Refactor Movies to use mongoose
- [x] Add movie model
    - [x] Create movie schema
    - [x] Create movie model
- [x] Import file movies to database
- [x] Fix own property handlebars problem with lean method
- [x] General fix for own property problem
- [x] Refactor movie Service

### Add Cast
- [x] Add new resources
- [x] Add Cast Controller
- [x] Create Cast page
- [x] Add Cast model
- [x] Add Cast service
- [x] Create Cast Functionallity

### Attach Cast to Movie (relation)
- [x] Add attach cast button
- [x] Add attach cast page
- [x] Add dynamic data to cast page
- [x] Show cast list in attach select
- [x] Add relation between cast and movie
- [x] Attach cast functionallity

### Show Cast on Details (population)
- [x] Get movie casts filtered
- [x] Show casts on details page
- [x] Get movie cast using population


### Bonuses
- [x] Filter casts if they are already attached
- [ ] Env variables
- [ ] name in a movie
- [ ] Add movie views to a folder
- [ ] Back refference from vscode

---

## Workshop 3 - Session and Authentication

### Initial Setup
- [x] Add resources

### Registration
- [x] Add new controller
- [x] Add registration page
- [x] Add User Model
- [x] Add User Service
- [x] Handle registration
- [x] Add password hashing


### Login 
- [x] Add login page
- [x] Handle login page
- [x] Validate User
- [x] Validate password
- [x] Create token
- [ ] Return token to client

### Logout
- [x] Add logout; clear cookie

### Authorization
- [x] Install cookie-parser
- [x] Add auth middleware
- [x] Validate user authenitacation
- [x] Add isAuth route guard
- [x] Add isGuest route guard

### Dynamic navigation
- [x] Group navigation by user type
- [x] Add auth info to handlebars context

### Show dynamic buttons on details page
- [x] Add edit and delete buttons on details page
- [x] Add creater relation
- [x] Add user as creator on movie create
- [x] Show button only for creators

### Edit movies
- [x] Add edit page
- [x] Add dynamic data in edit form

### Delete movies
- [x] Add delete action
- [x] Add creator validation
- [x] Handle edit

### Bonus
- [ ] Automatic login on register
- [x] Edit categories
- [ ] Invalidate JWT token on logout
- [ ] Refresh token