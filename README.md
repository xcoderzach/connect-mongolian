Connect Mongolian
=================

  A connect session store that uses mongolian, use this
rather than connect-mongo if you want to reuse your
mongolian connection, or don't want to add additional
dependencies to your project.

Installation
------------

```
npm install connect-mongolian
```

Options
-------

  * `server` - A db connection, if you already have one you want to use.
the result of calling `new Mongolian()`
  * `host` - hostName to connect to, defaults to "localhost"
  * `db` - name of database to use, defaults to "connectMongolianStore"
  * `port` - port to connect to, defaults to 27017
  * `collection` - name of the collection, defaults to "sessions"
 
Usage
-----

```javascript
var connect = require("connect")
  , MongolianStore = require("connect-mongolian")(connect) //or (express) if you're using express

connect.createServer( connect.cookieParser()
                    , connect.session({ store: new MongolianStore
                                      , secret: 'keyboard cat' }))
```
