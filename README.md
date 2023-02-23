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
      * End point: BaseURL/api/{id}
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

 1. Driver:

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

  2. Authen
  
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
  3. Booking

    a. get booking:
      * End Point: BaseURL/api/booking
      * params: null
      * response: array
      * method: Get

    b. Create new booking:
      * End point: BaseURL/api/booking
      * params: 
        {
          distance,
          fee,
          startLocation,
          endLocation,
          kidId,
          payment,
          vehicleType,
        }
      * reponse: object
      * method: POST

    c. accpect booking:
      * End point: BaseURL/api/booking/accpect/{id}
      * params: 
        {
          driverId
        }
      * response: object
      * method: POST
    
    d. completd booking:
      * End point: BaseURL/api/booking/completed/{id}
      * params: null
      * response: object
      * method: POST