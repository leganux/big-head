#! /usr/bin/env node

const {program} = require('commander')

const path = require('path')
const fs = require('fs')
const makeDir = require('make-dir');
const codeRagSdk = require('code-rag-sdk')
const {exec} = require("child_process");
const {def} = require("./template/public/pdfmake/pdfmake");


let copyRecursiveSync = function (src, dest) {
    let exists = fs.existsSync(src);
    let stats = exists && fs.statSync(src);
    let isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

program
    .command('console')
    .description('Creates new project of Big-Head based on template')
    .option('-d, --definition <definition...>', 'The full file folder and path of definition JSON. Mandatory ** ')
    .option('-l, --location <location...>', 'The full file folder and path where the project will be created. Default: ./  ')
    .option('-u, --uri <uri...>', 'APIed-Piper url server. Default:  http://localhost:3000/')
    .option('-b, --base <base...>', 'APIed-Piper base path server. Default: api/ ')
    .option('-p, --port <port...>', 'Port where Big-Head will run. Default: 3333 ')
    .action(async function ({definition, location, uri, base, port}) {

        console.log(`
Welcome to        
  ____  _             _   _                _            ____ _     ___ 
 | __ )(_) __ _      | | | | ___  __ _  __| |          / ___| |   |_ _|
 |  _ \\| |/ _\` |_____| |_| |/ _ \\/ _\` |/ _\` |  _____  | |   | |    | | 
 | |_) | | (_| |_____|  _  |  __/ (_| | (_| | |_____| | |___| |___ | | 
 |____/|_|\\__, |     |_| |_|\\___|\\__,_|\\__,_|          \\____|_____|___|
          |___/                                                        
                                        (c) 2021-2022 leganux.net                                                         
     v1.1.1   `)

        try {
            if (!definition) {
                console.log(
                    'the definition option is mandatory'
                )
                return
            }

            if (!uri) {
                uri = 'http://localhost:3000/'
            }
            if (!base) {
                base = 'api/'
            }
            if (!port) {
                port = 3333
            }
            if (!location) {
                location = path.join('./')
            } else {
                location = path.join(location)
            }
            console.log(
                'Step 1 - Verifying if location exists....'
            )
            if (fs.existsSync(location)) {
                console.log(
                    'Step 1.5 - Folder exists....'
                )
            } else {
                console.log(
                    'Step 1.5 - Folder does`t exists.... Creating...'
                )
                location = await makeDir(location);
                if (!fs.existsSync(location)) {
                    console.log(
                        'We can`t create dir. Please make it manually'
                    )
                    return
                }
            }

            console.log(
                'Step 2 - Verifying if server exists....'
            )

            let options = {
                engine: "axios",
            }
            let api_rest = new codeRagSdk(uri, base, options)
            try {
                let response = await api_rest.discover()
                console.log(response)
                if (!response) {
                    console.log(
                        'We can`t find the server. Try again later'
                    )
                    return
                }
            } catch (e) {
                console.log(
                    'We can`t find the server. Try again later'
                )
            }


            console.log(
                'Step 3 - Copying files....'
            )

            copyRecursiveSync(path.resolve(__dirname, 'template'), path.resolve(location, 'Big-Head-Console'))

            console.log(
                'Step 4 - Creating config files....'
            )

            let global = `module.exports = {
                            port: ${port},
                            api_url_base: "${uri}",
                            api_base_path: '${base}',
                        }`

            let routes = require(path.resolve(definition[0]))

            fs.writeFileSync(path.resolve(location, 'Big-Head-Console', 'config', 'global.config.js'), global)
            fs.writeFileSync(path.resolve(location, 'Big-Head-Console', 'config', 'def.json'), JSON.stringify(routes))

            console.log(
                'Step 5 - Installing dependencies....'
            )

            exec('npm install', {cwd: path.resolve(location, 'Big-Head-Console')}, function (err, stdout, stderr) {
                if (err) {
                    console.error('Error at installing dependencies please execute manually', err)
                }
                console.log('Install complete!! . Run the project using npm start ')
            })

        } catch (e) {
            console.error(
                'An error has been ocurred'
            )
            console.error(e)
            return
        }
    })


program
    .command('service')
    .description('Creates new project of APIed-Piper based on config file')
    .option('-d, --definition <definition...>', 'The full file folder and path of definition JSON. Mandatory ** ')
    .option('-l, --location <location...>', 'The full file folder and path where the project will be created. Default: ./  ')
    .option('-b, --base <base...>', 'APIed-Piper base path server. Default: /api/ ')
    .option('-p, --port <port...>', 'Port where Big-Head will run. Default: 3000 ')
    .option('-m, --mdb_uri <mdb_uri...>', 'The MongoDB URI to store data . Default: mongodb://localhost:27017/apied_piper ')
    .option('-u, --user <user...>', 'Admin User by default. Default: PIED ')
    .option('-pw, --password <password...>', 'Admin Password by default. Default: HBO_Sillicon33')
    .action(async function ({definition, location, base, port, mdb_uri, user, password}) {

        console.log(`
Welcome to        
  ____  _             _   _                _            ____ _     ___ 
 | __ )(_) __ _      | | | | ___  __ _  __| |          / ___| |   |_ _|
 |  _ \\| |/ _\` |_____| |_| |/ _ \\/ _\` |/ _\` |  _____  | |   | |    | | 
 | |_) | | (_| |_____|  _  |  __/ (_| | (_| | |_____| | |___| |___ | | 
 |____/|_|\\__, |     |_| |_|\\___|\\__,_|\\__,_|          \\____|_____|___|
          |___/                                                        
                                        (c) 2021-2022 leganux.net                                                         
        `)

        try {
            if (!definition) {
                console.log(
                    'the definition option is mandatory'
                )
                return
            }

            if (!base) {
                base = '/api/'
            }
            if (!mdb_uri) {
                mdb_uri = 'mongodb://localhost:27017/apied_piper'
            }
            if (!user) {
                user = 'PIED'
            }
            if (!password) {
                password = 'HBO_Sillicon33'
            }
            if (!port) {
                port = 3000
            }
            if (!location) {
                location = path.join('./')
            } else {
                location = path.join(location)
            }
            console.log(
                'Step 1 - Verifying if location exists....'
            )
            if (fs.existsSync(location)) {
                console.log(
                    'Step 1.5 - Folder exists....'
                )
            } else {
                console.log(
                    'Step 1.5 - Folder does`t exists.... Creating...'
                )
                location = await makeDir(location);
                if (!fs.existsSync(location)) {
                    console.log(
                        'We can`t create dir. Please make it manually'
                    )
                    return
                }
            }

            console.log(
                'Step 2 - Creating default server conf and ACL....'
            )


            let definition_ = require(path.join(definition[0]))

            let acl = {
                Admin: {}
            }

            for (var [key, value] of Object.entries(definition_)) {
                acl.Admin[key] = '*'

            }


            console.log(
                'Step 3 - Copying files....'
            )

            copyRecursiveSync(path.resolve(__dirname, 'template_server'), path.resolve(location, 'apied_piper_server'))

            console.log(
                'Step 4 - Creating config files....'
            )

            let global = `module.exports = {
    port: "${port}",
    base_path: "${base}",
    db_uri: "${mdb_uri}",
    user: '${user}',
    pass: '${password}',

}`

            let def = require(path.resolve(definition[0]))

            fs.writeFileSync(path.resolve(location, 'apied_piper_server', 'config', 'global.config.js'), global)
            fs.writeFileSync(path.resolve(location, 'apied_piper_server', 'config', 'acl.json'), JSON.stringify(acl))
            fs.writeFileSync(path.resolve(location, 'apied_piper_server', 'config', 'def.json'), JSON.stringify(def))

            console.log(
                'Step 5 - Installing dependencies....'
            )

            exec('npm install', {cwd: path.resolve(location, 'apied_piper_server')}, function (err, stdout, stderr) {
                if (err) {
                    console.error('Error at installing dependencies please execute manually', err)
                }
                console.log('Install complete!! . Run the project using npm start ')
            })

        } catch (e) {
            console.error(
                'An error has been ocurred'
            )
            console.error(e)
            return
        }
    })


program.parse()
