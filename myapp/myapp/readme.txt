- Group 19:
5964962 Renzo Schindeler
5893151 Rick Boumans

- Link:
http://webtech.science.uu.nl/group19

- Site structure:
Our site uses routers for each page to handle the various http requests in a structured and organized way. 

purchaseButtonScript(scripts):
start the buying process of the product which is being bought. Also handles toggling the visibility of the
confirmation screen when the buttons are pressed.

adjustNavBar(scripts):
Handles the navbar changes between being signed in and signed out.

getHistory.js(scripts):
Loads the history for the hisory page.

displayProduct.js(scripts):
Create an url using the input of the index.jade page. The initial value for the amount of products show is also generated here.

index.jade(views):
this page takes inputs to filter using checkboxes, min & max value and a searchbar. this also has a button to show 5 more products.
These filters work together to show you what you need.

index.js(routes): 
using jQuery's load function, we load the products using AJAX. This is done using the url created in displayProducts.js.

login.jade(views):
Takes the input to log in using a form.

login.js(routes):
Checks whetever the input matches an entry in the database and logs you in in this case. If the input does not match up with the database it 
will display an error.

signout.js(routes):
signs you out (surprise!) and destroys the session. Also redirects you to the home page.

signup.jade(views):
Takes the input to register a new user using a form.

signup.js(routes):
Checks whether the input matches an entry in the database and in this case throws an error that the username overlaps.
If the username does not exist, an account will be added to the database and a session will be created and you will be redirected
to the index page.

error.jade(views):
This is the display of the error if there is one thrown.

account.jade(views):
Displays the information of the account currently signed in. You can also give input to change the values of your account.

account.js(routes):
Takes the information from the account of the current session and sends this to display. If you post anything to
change values of your acount this gets changed.

history.jade(views):
Displays the buy history of your account.

history.js(routes):
Gets the order history of the current user. If none is available, display "no history found" message.

style.css(stylesheets):
handles all of the css.


LOGIN AND PASSWORDS OF USERS:

acc:  admin
pass: admin

acc:  grotebanaan
pass: banaan123



Our database has three tables:
- Accounts:
Table that keeps track of all users and their data.
CREATE TABLE Accounts (
    userid    INTEGER UNIQUE,
    username  TEXT    UNIQUE,
    password  TEXT,
    email     TEXT,
    firstname TEXT,
    lastname  TEXT
);


- Orders:
Table that keeps track of all order history.
CREATE TABLE Orders (
    date      DATETIME,
    productid TEXT,
    price     DECIMAL,
    userid    INTEGER
);

- Products:
Table that stores all the products and their information.
CREATE TABLE Products (
    productid          INTEGER,
    productname        TEXT,
    productdescription TEXT,
    publisher          TEXT,
    releasedate        DATE,
    price              DECIMAL,
    stock              INTEGER,
    genre              TEXT
);
 

We also have a sessions database that keeps track of all the current sessions and stores the session together with the userid.
CREATE TABLE sessions (
    sid      PRIMARY KEY,
    expired,
    sess
);

we have not implemented extra credit features.
