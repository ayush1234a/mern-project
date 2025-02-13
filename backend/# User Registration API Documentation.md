# User Registration API Documentation

## Register User Endpoint

**URL**: `/users/register`
**Method**: `POST`

### Description
Creates a new user account with the provided information. The endpoint validates the input data, hashes the password for security, and returns a JWT token upon successful registration.

### Request Body Schema

```json
{
  "fullname": {
    "firstname": "string", // required, min length: 3
    "lastname": "string"   // optional, min length: 3 if provided
  },
  "email": "string",       // required, must be valid email
  "password": "string"     // required, min length: 6
}
```

### Validation Rules
- `firstname`: Must be at least 3 characters long
- `email`: Must be a valid email format and at least 5 characters long
- `password`: Must be at least 6 characters long
- All required fields must be provided

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secretpassword"
}
```

### Responses

#### Success Response
- **Status Code**: `201 Created`
- **Content**:
```json
{
  "user": {
    "_id": "mongodbId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  },
  "token": "jwt_token_string"
}
```

#### Error Responses

##### Validation Error
- **Status Code**: `400 Bad Request`
- **Content**:
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

##### Missing Fields Error
- **Status Code**: `400 Bad Request`
- **Content**:
```json
{
  "error": "Please provide all fields"
}
```

### Security Features
- Password is hashed using bcrypt with salt rounds of 10
- JWT token is generated for authentication
- Password is excluded from user responses

### Example cURL Request

```bash
curl -X POST http://your-api-domain/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secretpassword"
  }'
```