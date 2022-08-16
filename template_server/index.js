let apied_piper = require('apied-piper')
let acl = require('./config/acl.json')
let definition = require('./config/def.json')
let conf = require('./config/global.config')


let microService = new apied_piper(definition, conf.db_uri, conf.port, {
    db_timestamps: true,
    api_base_uri: conf.base_path,
    acl: acl,
    activeLogRequest: true,
    active_cors: true
})


microService.constructRoutes()
microService.activeLoginAndRegister({user: conf.user, pass: conf.pass}, undefined,
    {
        activeNewUsers: true,
    }
)
microService.publishServerStats()
microService.start()
