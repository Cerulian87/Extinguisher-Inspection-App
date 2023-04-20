# Extinguisher-Inspection-App
## Fullstack Capstone project for MSU Denver's AHEC required for course CIS4050


An explanation for this full stack web as is as follows:
  AHEC, Auroria Higher Education Center, needs a system to replace their current fire extinguisher inspection methods which include hand written logs - 
  as well as multiple spreadsheets that have many redundancies. We're proposing a web app that uses Django's backend to manage a database, api, and - 
  authentication, which is utilizing Django RestFramework. The front end, which is written using React.js, will handle all user interfacing and inputs.
  The frontend and backend will also be utilizing Django Cors Headers to mitigate issues between the two platforms when sharing resources. This app - 
  essentially will need to give all types of extinguisher inspection employees a platform to conduct their procedures and maintain orderly logs.
 
 
# Dependencies include:
## Backend:
  - Python v3.10
  - Python venv (virtual environment)
  - Django 4.1.7
  - Django-Cors-Headers 3.14
  - Django RestFramework
  - Django RestFramework-SimpleJWT
  
## Frontend:
  - Node 19.8.1
  - React 18.2
  - React-Router-Dom 6.10
  
### [Guide to using git](https://phoenixnap.com/kb/how-to-use-git)

# Installation guide:
Make sure both Python and Node are installed onto your machine.
- Open up your command line and type: python --version. If not installed, go to [Python Website](https://www.python.org/downloads/)
- Also check for Node with: node -v. If not installed, go to [Node Website](https://nodejs.org/en/download)
- Check that you have pip: python pip -m --version
- Fork/Clone this Github Repo [Learn more about how to Fork/Clone a Github Repo here...](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)
- Open command line/powershell/terminal of your choice
- CD into the inspectionapp directory
    - Example: cd Desktop/cis_4050_capstone/inspectionapp
- Install virtual environment: 
    - python -m pip install virtualenv
- Create your environment named 'env': 
    - python -m venv env
- Activate your venv:
    - .\env\Scripts\activate
- Backend Dependencies:
    - python -m pip install Django
    - pip install djangorestframework
    - python -m pip install django-cors-headers
    - pip install djangorestframework-simplejwt
    - python manage.py runserver (This should start your server on port 8000)
- For frontend installs:
    - cd frontend
    - npm install
    - npm install react-router-dom
    - npm start (this should start the frontend on port 3000)
    
### This is not an exhaustive list directions but should give you enough information to get started and look in the right direction if issues arise.
Also keep in mind versions as some upgrades might change syntax.
