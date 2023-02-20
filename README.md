# Pikid Project
1. Run `npm start` command


# Router

   Base URL: .../api

  1. User: 

    a. get user: 
      * End point: BaseURL/api/driver
      * Params: null
      * response: array
      * method: Get
    b. get user by Id: 
      * End point: BaseURL/api/driver/{id}
      * Params: id 
      * response: object
      * method: Get
    c. update user:
      * End point: BaseURL/api/driver
      * Params: 
      {
        email,
        password
        name,
        phone,
        avatar
      }
      * response: array
      * method: post
    d. delete user:
      * End point: BaseURL/api/driver/{id}
      * Params: id
      * response: array
      * method: delete

 2. Driver:
   
    a. get driver: 
      * End point: BaseURL/api/driver
      * Params: null
      * response: array
      * method: Get

    b. get driver by Id: 
      * End point: BaseURL/ api/driver/{id}
      * Params: id 
      * response: object
      * method: Get

    c. update driver:
      * End point: BaseURL/api/driver
      * Params: 
        [
          
        ]
      * response: array
      * method: post

    d. delete driver:
      * End point: BaseURL/api/driver/{id}
      * Params: id
        * response: array
      * method: delete

  3. Authen
  
    a. Register user:
      * End point: BaseURL/auth/register
      * params: 
        {
          name,
          email,
          password,
          phone
        }
      * response: array
      * method: POST
    b. Register driver:
      * End point: BaseURL/auth/register/driver
      * params:
        {

        }
      * response: array
      * menthod: Post
    c. Login User:
      * End point: BaseURL/auth/login
      * params
        {
          email,
          password
        }
      * response: array
      * menthod: Post
    d. Login Driver:
      * End point: BaseURL/auth/login/driver
      * params
        {
          email,
          password
        }
      * response: array
      * menthod: Post
