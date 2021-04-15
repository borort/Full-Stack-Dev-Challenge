## Full Stack Dev Challenge (PayPay)

By: Borort Sort
Date: 2021/04/15


## Assumptions

- Admin and Employee user are the same user entity distinguished by role (is_admin: false/true)
- Admin user can create a performance review, assign multiple employees/users as reviewees for that specific performance review, and assign multiple employees/users as reviewers for each reviewee's performance review
- A reviewer can submit only one review feedback for each pending feedback request. Once submitted, the feedback cannot be edited or resubmitted


## Database Design

users
- id
- first_name
- last_name
- email
- password
- position
- is_admin

performance_reviews
- id
- user_id (creator)
- name
- description
- due_date

performance_review_reviewees
- id
- pr_id (performance_reviews.id)
- user_id (reviewee)

performance_review_feedbacks
- id
- pr_reviewee_id (performance_review_reviewees.id)
- user_id (reviwer)
- feedback
- rating
- is_submitted


## Tech Stacks
- Backend: Laravel 8, Laravel Sanctum for API Authentication
- Frontend: Angular 11, Angular Material design components
- Database: MySQL


## How to run the apps

(1) Unzip the project folder or download the source code from my GitHub repository at: https://github.com/borort/Full-Stack-Dev-Challenge

(2) Create a MySQL database

(3) Backend installation:
- cd backend
- Config the .env (rename .env.example file to .envinside and update database information)
- composer install
- php artisan key:generate
- php artisan migrate
- php artisan db:seed (to create a new admin user, email: admin@test.com/pwd: password)
- php artisan serve --port 8002 (or any port number of your choice)

(4) Frontend installation
- cd frontend
- config the environment file (src/environments/environment.ts), make sure to set the correct API url (e.g. http://127.0.0.1:8002/api)
- npm install
- ng serve --port 4500 -o   (or any port number of your choice)
- go to 127.0.0.1:4500 and login with admin user account generated during backend installation


## Working Functionalities

- User authentication (Login and Logout)
- Dashboard/landing page
- Employees page (only Admin can view this page): Admin user can create/view/update/delete employee users.
- Performance Reviews Page (only Admin can view this page): Admin user can create/view/update performance review with the ability to assign reviewees and reviewers.
- Feedback Requests page (Both Admin and employee user can view this page): Displays a list of inquiring feedback requests that have been assigned to the authenticated user. The reviewer can submit feedback for each pending feedback request. Once submitted, the reviewer cannot resubmit the feedback for the same request.















