const express = require('express');
const router = express.Router();
const Routes = require('./config/def.json')
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


router.get('/', function (req, res) {
    res.status(200).render('login', {
        Assets,
        Global,
        Menu,
        Definitions,
        params: {
            uri: Global.api_url_base + Global.api_base_path,
            api_url_base: Global.api_url_base,
            api_base_path: Global.api_base_path,
        }

    })
})

router.get('/dashboard', function (req, res) {
    res.status(200).render('dashboard', {
        Assets,
        Global,
        Menu,
        Definitions,
        params: {
            uri: Global.api_url_base + Global.api_base_path,
            api_url_base: Global.api_url_base,
            api_base_path: Global.api_base_path,
        }

    })
})

router.get('/page/:pagename', function (req, res) {
    let {pagename} = req.params;

    let arr = []

    for (var [key, value] of Object.entries(Routes[pagename].definition)) {
        let inner = value
        inner.name = key
        arr.push(inner)
    }

    res.status(200).render('page', {
        Assets,
        Global,
        Menu,
        Definitions,
        pagename,
        fields: arr,
        params: {
            uri: Global.api_url_base + Global.api_base_path,
            api_url_base: Global.api_url_base,
            api_base_path: Global.api_base_path,
            fields: JSON.stringify(arr),
            pagename
        }

    })
})

module.exports = router
