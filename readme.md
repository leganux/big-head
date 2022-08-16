# BIG-HEAD

<p align="center">
    <img src="./cabezon.jpg" width="90%" title="hover text">

</p>

An easy Front-End control panel generator for APIed-Piper, and now server generator too.

If you want to know more about APIed-Piper visit: <a href="https://www.npmjs.com/package/apied-piper" target="_blank">
npm APIed-Piper docs</a>

<hr>

<b>Install: </b>

```text
npm i -g big-head
```

### How to use

### Definition file

First you need to create a definition file, this files  will help you to construct your server and console. for more information visit the <a href="https://www.npmjs.com/package/apied-piper" target="_blank">
npm APIed-Piper docs</a> to know about definition file

```JSON
{
  "category": {
    "operation": {
      "all": true
    },
    "definition": {
      "name": {
        "type": "string",
        "mandatory": true
      },
      "active": {
        "type": "boolean",
        "mandatory": true,
        "default": false
      },
      "key": {
        "type": "number"
      }
    },
    "datatable_search_fields": [
      "name"
    ]
  },
  "type": {
    "operation": {
      "all": true
    },
    "definition": {
      "name": {
        "type": "string",
        "mandatory": true
      },
      "active": {
        "type": "boolean",
        "mandatory": true,
        "default": false
      },
      "key": {
        "type": "number"
      }
    },
    "datatable_search_fields": [
      "name"
    ]
  },
  "product": {
    "operation": {
      "all": true
    },
    "definition": {
      "name": {
        "type": "string",
        "mandatory": true
      },
      "description": {
        "type": "string"
      },
      "count": {
        "type": "number",
        "mandatory": true,
        "default": 0
      },
      "type": {
        "type": "oid",
        "rel": "type"
      },
      "category": {
        "type": "oid",
        "rel": "category"
      },
      "moreInfo": {
        "type": "any"
      }
    },
    "datatable_search_fields": [
      "name"
    ]
  }
}
```

Once you create your definition file, you can create 

* A microservice
* B admin console for microservice


#### Create a microservice server 

command
```text
bighead service 
```

options
```text
 -d, --definition <definition...>  The full file folder and path of definition JSON. Mandatory **
  -l, --location <location...>      The full file folder and path where the project will be created. Default: ./
  -b, --base <base...>              APIed-Piper base path server. Default: /api/
  -p, --port <port...>              Port where Big-Head will run. Default: 3000
  -m, --mdb_uri <mdb_uri...>        The MongoDB URI to store data . Default: mongodb://localhost:27017/apied_piper
  -u, --user <user...>              Admin User by default. Default: PIED
  -pw, --password <password...>     Admin Password by default. Default: HBO_Sillicon33
  -h, --help                        display help for command


```



#### Create an admin panel for server

command
```text
bighead console 
```

options
```text
Options:
  -d, --definition <definition...>  The full file folder and path of definition JSON. Mandatory **
  -l, --location <location...>      The full file folder and path where the project will be created. Default: ./
  -u, --uri <uri...>                APIed-Piper url server. Default:  http://localhost:3000/
  -b, --base <base...>              APIed-Piper base path server. Default: api/
  -p, --port <port...>              Port where Big-Head will run. Default: 3333
  -h, --help                        display help for command


```

finally enter the folder and run

```text
npm start
```

or edit the project, in your favourite editor

<hr>

<p align="center">
    <img src="https://leganux.net/web/wp-content/uploads/2020/01/circullogo.png" width="100" title="hover text">
    <br>
  BIG-HEAD is another project of  <a href="https://leganux.net">leganux.net</a> &copy; 2022 all rights reserved
    <br>
   This project is distributed under the APACHE 2.0 license. 

<br>
<br>
The logo and the name of BIG-HEAD is inspired by the name of Big Head Bighetti, the fictional character of HBO series, Silicon Valley. This inspiration was taken for fun purposes only. The original name and logo reserve their rights to their original creators. 
</p>
