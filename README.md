# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

Demo site: https://wonderful-fermat-d0fb83.netlify.com

## Prerequisite
```
node -v       # node version more than 10.16.3
sls -v        # serverless cli (more than 1.50.0)
aws --version # aws cli (more than aws-cli/1.16.220)
```

## Setup
```
yarn setup
```

## Instructions
```
yarn dev             # for developing
yarn build:client    # for building client pages
yarn deploy          # for deploying serverless services
```

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
- [x] Add/remove/update/view employees
- [x] Add/update/view performance reviews
- [x] Assign employees to participate in another employee's performance review

### Employee view
- [x] List of performance reviews requiring feedback
- [x] Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
* This is not a pass or fail test, this will serve as a common ground that we can deep dive together into specific issues
