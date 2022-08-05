const express = require('express');
const router = express.Router();
const Routes = require('./config/routes.config')
const Global = require('./config/global.config')
const Assets = require('./config/assets.config')

let processRoutes = function (Routes) {
    let Menu = []
    let Definitions = {}

    for (let [key, value] of Object.entries(Routes)) {
        Menu.push(key)
        let def = value.definition
        Definitions[key] = []
        for (let [key_, value_] of Object.entries(def)) {
            let ob = {
                name: key_,
                type: value_.type,
                mandatory: value_.mandatory,
            }
            Definitions[key].push(ob)
        }
    }
    return {Menu, Definitions}
}
let {Menu, Definitions} = processRoutes(Routes)

console.log('RRRRR  ', Menu, Definitions)


router.get('/', function (req, res) {
    res.status(200).render('login', {
        Assets,
        Global,
        Menu,
        Definitions
    })
})

module.exports = router
