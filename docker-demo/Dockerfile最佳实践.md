* docker run -p 8989:80 -d --name vue-nginx-container vue-nginx-container




* Pass environment variables from docker to my Nodejs
* https://medium.com/@felipedutratine/pass-environment-variables-from-docker-to-my-nodejs-or-golang-app-a1f2ddec31f5

* sudo  docker run [...] -e my_connection_string = 'xxxx' -e my_password = 'xxxx' [...]

* my_env.list

```
my_connection_string = xxxx
my_password  = yyyy
my_secret = xxxx

```

* sudo docker run [...] --env-file ./my_env.list [...]


* GET the variables in NodeJs

* All the variables pass to docker, will be found in porcess.env.{Key}


* Try in a node console app deockerize

* console.log('Hello' + process.env.NAME)

* 