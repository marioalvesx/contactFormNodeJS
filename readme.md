# 📩 Contact Form using Nodemailer at Umbler 
A simple contact form using HTML and NodeJS (using Nodemailer) to send e-mail for notification, confirmation or what else you want.

## What you have to known
In order to send notifications messages via one of your e-mails accounts, you need to notice the SMTP port tha you're using to do so:
- **SMTP:** 587 → Port without SSL
- **SMTP:** 465 → Port with SSL
    - More destined to e-mail managers.

- For example:
```
const config = mailer.createTransport ({
    host: "smtp.umbler.com",
    port: 587,    
    auth: {     
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: { rejectUnauthorized: false } // true for 465, false to other ports
});
```
See that I left a comment on the line explaining the use of tls property.
This property is required to be declared within the transport function of Nodemailer.
You can see it in the very documentation of Nodemailer: https://nodemailer.com/smtp/.

In Umbler, depending of the SMTP port that you're using you have to do it too.

## Good practices - Environment variables
Never explicit your password by any means in any kind of code.
That's why you see the 'proccess.env' variable.
That is a **enviroment variable**. A thing that is used to secure sensible data.
It is used to speed up the exchange of values ​​that are used in various files and mainly to store passwords from email(which is the case), database or what else you need to use.

### How to use Enviroment Variables in my NodeJS project?
It's very simple:
First you need to install the DOTENV dependency in your project using the package manager of your preference:

``` npm install dotenv ``` or ``` yarn install dotenv ```

Then, you create a file called **.env**, just like that.
Now you put the name of your environment variable and the value that you want to secure. For example:
``` EMAILPASS=mypassword ```

If you want to put more than one, just separate it by line.

Last but not least, you have to use your enviroment variable created calling your .env file created in your js file, like this:

``` require('dotenv').config() ```

And you use your secured values with the proccess.env in the beginning.

And that's it, hope it can help you 😉
