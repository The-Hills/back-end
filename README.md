# Pikid Project
1. Run `npm install` command
2. Create .env file and config variables
3. Run `npm start` command


# Router

   Base URL: http://ec2-18-179-22-58.ap-northeast-1.compute.amazonaws.com/api/

  1. User: 

    a. get list user: 
      * End point: BaseURL/
      * Params: null
      * response: array
      * method: GET

    b. get user by Id: 
      * End point: BaseURL/{id}
      * Params: id 
      * response: object
      * method: GET

    c. update user:
      * End point: BaseURL/{id}
      * Params: id
      * Data: {
        name,
        phone,
        avatar,
      }
      * response: Object
      * method: POST

    d. delete user:
      * End point: BaseURL/{id}
      * Params: id
      * response: array
      * method: DELETE

 2. Driver:

    a. get driver: 
      * End point: BaseURL/driver
      * Params: null
      * response: array
      * method: GET

    b. get driver by Id: 
      * End point: BaseURL/driver/{id}
      * Params: id 
      * response: object
      * method: GET

    c. update driver:
      * End point: BaseURL/driver/{id}
      * Params: id
      * Data: {
          name,
          phone,
          gender: {
            male,
            female,
            other
          },
          avatar,
          cardId,
          driverLicense,
          currentLocation: {
            latitude: number,
            longitude: number
          },
      }
      * response: Object
      * method: POST

    d. delete driver:
      * End point: BaseURL/driver/{id}
      * Params: id
        * response: array
      * method: DELETE

  3. Authen
  
    a. Register user:
      * End point: BaseURL/auth/register
      * params: null
      * Data: {
          email, 
          password, 
          phone, 
          name, 
          gender: {
            male,
            female,
            other
          },
        }
      * response: Object
      * method: POST

    b. Register driver:
      * End point: BaseURL/auth/register/driver
      * params: null
      * Data: {
          email,
          password,
          name,
          phone,
          gender: {
            male,
            female,
            other
          },
          avatar,
          cardId,
          driverLicense,
        }
      * response: Object
      * menthod: POST

    c. Login User:
      * End point: BaseURL/auth/login
      * params: null
      * Data: {
          email,
          password
        }
      * response: Obejct
      * menthod: POST

    d. Login Driver:
      * End point: BaseURL/auth/login/driver
      * params: null
      * Data: {
          email,
          password
        }
      * response: Object
      * menthod: POST

    e. Register admin:
      * End point: BaseURL/auth/register/admin
      * params: null
      * Data: {
          email,
          password,
          name,
        }
      * response: Object
      * menthod: POST

    f. Login Admin:
      * End point: BaseURL/auth/login/admin
      * params: null
      * Data: {
          email,
          password
        }
      * response: Object
      * menthod: POST

  4. Booking

    a. get booking:
      * End Point: BaseURL/booking/
      * params: null
      * response: array
      * method: GET

    b. Create new booking:
      * End point: BaseURL/booking
      * params: null
      * Data: {
          distance,
          startLocation: string,
          endLocation: string,
          startPosition: {
            latitude: number,
            longitude: number
          },
          endPosition: {
            latitude: number,
            longitude: number
          },,
          kidId,
          fee,
          payment,
          typeVehicle: string
        }
      * reponse: object
      * method: POST

    c. accpect booking:
      * End point: BaseURL/booking/accpect/{id}
      * params: id
      * Data: {
          driverId
        }
      * response: object
      * method: POST
    
    d. completd booking:
      * End point: BaseURL/booking/completed/{id}
      * params: id
      * response: object
      * method: POST
   
  5. Kid:

    a. Get list kid: 
      * End point: BaseURL/kid
      * Params: null
      * Response: Array
      * Method: GET
    
    b. Get kid by id:
      * End point: BaseURL/kid/{id}
      * Params: id
      * Response: Object
      * Method: GET
    
    c. Create kid:
      * End point: BaseURL/kid/
      * Params: null
      * Data: {
        parentId
        name
        age
        gender: {
          male,
          female,
          other
        }
        image: File
      }
      * Response: Object
      * Method: POST
    
    d. Update Kid
      * End point: BaseURL/kid/{id}
      * Params: id
      * Data: {
        name,
        age, 
        avatar: File, 
        gender: {
          male,
          female,
          other
        }
      }
      * Response: Object
      * Method: POST
    
    e. Delete kid:
      * End point: BaseURL/kid/{id}
      * Params: id
      * Response: Object
      * Method: DELETE
    
  6. Payment:

    a. Create Payment URL:
      * End point: BaseURL/payment/create_payment_url
      * Params: null
      * Data: {
        amount,
        bankCode,
        orderInfo,
        ipAddress
      }
      * Response: URL: string
      * Method: POST