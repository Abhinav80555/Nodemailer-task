 
# Nodemailer-nodejs-api
### Hosted Link
[https://nodemailr.herokuapp.com/](https://nodemailr.herokuapp.com/)


### API Endpoints

##### 1)User Signup
https://nodemailr.herokuapp.com/signup
```
Method-post
```

`Body`: 
```
{
    "name": "your name",
    "email": "example@gmail.com",
    "password": "your password"
}
```




##### 2)User Login
https://nodemailr.herokuapp.com/login
```
Method-post
```
`Body`: 
```
{
    "email": "example@gmail.com",
    "password": "your password"
}
```




##### 3)send Email when authorized
https://nodemailr.herokuapp.com/mailsend
```
#### Method-post
```
` Headers`:
```
x-auth-token: JWT token
``` 

`Body`: 
```
{
    "receiverEmail": "receiver@gmail.com",
    "subject": "mail subject",
    "text": "mail text"
}

```




##### user signup
https://nodemailr.herokuapp.com/forgetpassword
```
#### Method-put
```

`Body`: 
```
{
    "email": "example@gmail.com",
}
```



