# Crossover Dating App

> Dating app with instant chatting capabilities built with React, Ruby on Rails, Action Cable, Active Record and Action Mailer

Crossover is a full-stack project built with a React Frontend and a Ruby on Rails backend, that allows users to match with their favorite 90's cartoon characters and chat with real time messages. This app was created as my Phase 4 project for Flatiron school and recently restyled.

This app features full user authentication and authorization, react time messaging and matching using WebSockets, and allows users to easily create and edit their profile, as well as view other user's profiles.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Demo](#demo)
- [Schema](#schema)
- [Backend API Endpoints](#backend-api-endpoints)
- [Setup](#setup)
- [Acknowledgements](#acknowledgements)

## Technologies Used

- React 18.2.0
- Ruby 2.7.4
- Rails 7.0.8
- Action Cable
- Action Mailer
- Active Record
- Redis
- React Router Dom 6.21.3
- React Tinder Card 1.6.4
- TailwindCSS 3.4.1
- Formik 2.4.5
- React useState, useEffect, useRef

## Features

Users will be able to:

- Sign-up and create a profile
- Edit their profile
- Recieve a token via email to reset their passwords
- Browse users according to their gender interests and sexuality
- View other users' profiles
- Swipe right or left to match with other users
- Message matched users in real time

### Demo

#### Login/SignUp

![]()

#### Create Profile

![]()

#### Match with users and view profile

![]()

#### Chat with users

![]()

#### Edit profile

![]()

#### Reset password

![]()

### Schema

![Database Schema](/images/Schema.png)

### Backend API Endpoints

| Method | Endpoint                             | Params | Description                                   |
| ------ | ------------------------------------ | ------ | --------------------------------------------- |
| POST   | /api/matches                         |        | create a match                                |
| PATCH  | /api/users/:id                       |        |                                               |
| POST   | /api/users/:id/message_history       |        |                                               |
| POST   | /api/users/:id/create_message        |        |                                               |
| GET    | /api/users/:id/message_histories     |        |                                               |
| GET    | /api/users/:id/matches/:recipient_id |        |                                               |
| POST   | /api/users/:id                       |        |                                               |
| GET    | /api/users/:id                       |        |                                               |
| PATCH  | /api/matches                         |        |                                               |
| GET    | /api/me                              |        | authorize user                                |
| POST   | /api/signup                          |        | create a user                                 |
| POST   | /api/login                           |        | signs a user in                               |
| DELETE | /api/logout                          |        | logs out a user                               |
| POST   | /api/forgot_password                 |        | sends forgot password email to reset password |
| POST   | /api/reset_password                  |        |                                               |
| POST   | /api/change_password                 |        |                                               |

## Setup

To run this project, follow the following steps.

1. Fork/clone this repo to your local environment.
2. Install latest versions of the technologies listed above, if needed.
3. In your terminal, run `bundle install` and `rails db:create db:migrate db:seed`
4. Next, run `rails s` to start the server on http://localhost:3000
5. From here, you can run `npm install --prefix client` and `npm start --prefix client` to browse the frontend on http://localhost:4000.

## Acknowledgements

This project was created as my Phase 4 project for Flatiron School.

The card swiping fucntionality was inspired by Tinder, and the styling is inspired by MTV's classic moody aesthetic.

Big thank you to Ania Kubów's [Tinder Clone Tutorial](https://www.youtube.com/watch?v=Q70IMS-Qnjk&t=7250s) which inspired me to create the project and helped tremendously with the starter code setup.

I also wanted to thank [this article](https://blog.devgenius.io/integrate-action-cable-with-react-and-ruby-on-rails-to-build-a-one-to-one-chatting-app-4f0feb5479e6) that helped me understand how to setup Action Cable.
