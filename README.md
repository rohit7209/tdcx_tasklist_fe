# TDCX tasklist frontend

#### Live App: [https://tdcx-tasklist-fe.herokuapp.com/](https://tdcx-tasklist-fe.herokuapp.com/)

##
#### Login Details:
###### Name: ```Rohit Sharma```
###### API Key: ```X3XeZYJRCj```
##

#### Local Setup:
- update BASE_URL here: ```src/api/constants.js```
- run ***yarn start***

#### File & folder structure
- ##### Entry File - 
   - **index.js** - responsible for rendering dom in root element (of index.html), also imports css & enwrap ```App.jsx``` with global providers
    - **App.jsx** - enwraps the application with base layout & implements routing _(routing not implemented in this application)_

- ##### Components `src/components`
    repository of all the utility components within the application, it also serves as the base ui framework of the application

- ##### Containers `src/containers`
    it has most complex components of the application which implements complex business logics and deals with backend api, local storage & inter-component communication.
    - **Dashboard** ```src/containers/Dashboard``` - it organizes user's landing view after login
    - **Login** ```src/containers/Login``` - user's login portal
    - **Layout** ```src/containers/Layout``` - It is the wrapping component to the entire application, also implements header & footer and their logic.
- ##### Api ```src/api```
    facilitates communication with backend api over https protocol.
- ##### Providers ```src/providers```
    repository for context providers of the application
- ##### Hooks ```src/hooks```
    repository for custom and enhanced hooks
- ##### Storage ```src/storage```
    handles all the local storage mechanism of the application
- ##### Assets ```src/assets```
    repository for static files

#### License
WTFPL
**Demo Software :)**

new change 1233