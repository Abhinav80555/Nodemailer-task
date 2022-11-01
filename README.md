 
# Nodemailer-nodejs-api
###Hosted Link
[https://nodemailr.herokuapp.com/](https://nodemailr.herokuapp.com/)


### API Endpoints
####Method-post
#####User Signup
https://nodemailr.herokuapp.com/signup


`Body`: 
```
{
    "name": "your name",
    "email": "example@gmail.com",
    "password": "your password"
}
```

####Method-post
#####User Login
https://nodemailr.herokuapp.com/login

`Body`: 
```
{
    "email": "example@gmail.com",
    "password": "your password"
}
```


####Method-post
#####send Email when authorized
https://nodemailr.herokuapp.com/mailsend

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



####Method-put
```
#####user signup
https://nodemailr.herokuapp.com/forgetpassword
`Body`: 
```
{
    "email": "example@gmail.com",
}
```



