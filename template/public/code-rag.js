let axios = {}
try {
    axios = require('axios')
} catch (e) {

}


let codeRagSdk = function (host_uri = 'http://localhost:3000/', api_base = "api/", options = {}) {

    console.log(`
    Welcome to 
         ____ ____ ____ ____ ____ ____ ____ ____ 
         ||C |||O |||D |||E |||- |||R |||A |||G ||  == SDK ==
         ||__|||__|||__|||__|||__|||__|||__|||__||
         |/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|
                  This is a project made by leganux.net (c) 2021-2022 
            ______________________________________
      Read the docs at https://www.npmjs.com/package/code-rag-sdk
    `)

    this.host_uri = host_uri
    this.api_base = api_base
    this.options = options
    this.furi = host_uri + api_base
    this.token = 'Bearer NONE'
    this.acl = 'OPEN'

    this.routes = {}
    this.hasBeenDiscovered = false
    this.presentAuth = false
    this.resource = false


    this.parseQuery = function (params) {
        let result = '';

        function convertJsonToQueryString(data, progress, name) {
            name = name || '';
            progress = progress || '';
            if (typeof data === 'object') {
                Object.keys(data).forEach(function (key) {
                    let value = data[key];
                    if (name == '') {
                        convertJsonToQueryString(value, progress, key);
                    } else {
                        if (isNaN(parseInt(key))) {
                            convertJsonToQueryString(value, progress, name + '[' + key + ']');
                        } else {
                            convertJsonToQueryString(value, progress, name + '[' + key + ']');
                        }
                    }
                })
            } else {
                result = result ? result.concat('&') : result.concat('?');
                result = result.concat(`${name}=${data}`);
            }
        }

        convertJsonToQueryString(params);
        return result;
    };

    this.executor = async function (method = 'GET', headers = {}, path = '', body = {}, query = {v__: Math.random()}) {
        let el = this
        let response = {}
        let parsedQuery = el.parseQuery(query)
        if (el.presentAuth) {
            headers.Authorization = el.token
        }

        let url = el.furi + path + parsedQuery
        if (el?.options?.logRequest) {
            console.log('CODE-RAG-SDK:', method, url)
        }


        try {
            if (el?.options?.engine == 'axios') {
                switch (method.toUpperCase()) {
                    case 'POST':
                        response = await axios.post(url, body, {headers})
                        return response.data
                        break;
                    case 'GET':
                        response = await axios.get(url, {headers})
                        return response.data
                        break;
                    case 'PUT':
                        response = await axios.put(url, body, {headers})
                        return response.data
                        break;
                    case 'DELETE':
                        response = await axios.delete(url, {headers})
                        return response.data
                        break;
                    case 'OPTIONS':
                        response = await axios.options(url, {headers})
                        return response.data
                        break;
                    case 'PATCH':
                        response = await axios.patch(url, body, {headers})
                        return response.data
                        break;
                }

            } else {


                headers['Content-Type'] = 'application/json';
                headers['Accept'] = 'application/json';


                switch (method.toUpperCase()) {
                    case 'POST':
                        response = await fetch(url, {
                            method: 'POST',
                            headers,
                            body: JSON.stringify(body),
                        })
                        response = await response.json()
                        return response
                        break;
                    case 'GET':
                        response = await fetch(url, {
                            method: 'GET',
                            headers

                        })
                        response = await response.json()
                        return response
                        break;
                    case 'PUT':
                        response = await fetch(url, {
                            method: 'PUT',
                            headers,
                            body: JSON.stringify(body),
                        })
                        response = await response.json()
                        return response
                        break;
                    case 'DELETE':
                        response = await fetch(url, {
                            method: 'DELETE',
                            headers,
                            body: JSON.stringify(body),
                        })
                        response = await response.json()
                        return response
                        break;
                    case 'OPTIONS':
                        response = await fetch(url, {
                            method: 'OPTIONS',
                            headers,
                            body: JSON.stringify(body),
                        })
                        response = await response.json()
                        return response
                        break;
                    case 'PATCH':
                        response = await fetch(url, {
                            method: 'PATCH',
                            headers,
                            body: JSON.stringify(body),
                        })
                        response = await response.json()
                        return response
                        break;

                }

            }

        } catch (e) {
            console.error(e)
            throw e
        }
    }

    this.discover = async function () {
        let el = this
        try {
            let disc = await el.executor('POST', undefined, '', undefined, undefined)

            if (disc.success) {
                el.acl = disc?.data?.acl
                el.routes = disc?.data?.routes
            }
            el.hasBeenDiscovered = true

            try {
                if (localStorage.getItem('code-rag-token')) {
                    el.token = localStorage.getItem('code-rag-token')
                    el.presentAuth = true
                }
            } catch (e) {

            }


            return disc?.data
        } catch (e) {
            console.error(e)
            return e.message
        }


    }
    this.login = async function (password = '', user = '', saveInLocalStorage = true) {
        let el = this
        let method = 'POST'
        try {
            let resp = await el.executor(method, undefined, 'login', {user: user, pass: password}, undefined)
            if (resp.success) {
                el.token = 'Bearer ' + resp.data.token
                el.presentAuth = true
                if (saveInLocalStorage) {
                    try {
                        localStorage.setItem('code-rag-token', el.token)
                    } catch (e) {
                    }

                }
            }
            return resp?.data
        } catch (e) {
            console.error(e)
            return e.message
        }

    }
    this.logout = async function (removeFromLocalStorage = true) {
        let el = this
        el.token = 'Bearer NONE'
        if (removeFromLocalStorage) {
            try {
                localStorage.removeItem('code-rag-token')
            } catch (e) {

            }
        }


    }
    this.resourceAccess = async function () {
        let el = this
        let arr = []
        for (let [key, value] of Object.entries(el.routes)) {
            arr.push(key)
        }
        return arr

    }
    this.setResource = function (resource = false) {
        let el = this
        if (resource) {
            el.resource = resource
        }
        return el

    }

    this.createOne = async function (body = {}, query = {}) {
        let el = this
        let method = 'POST'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource, body, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    this.createMany = async function (body = [], query = {}) {
        let el = this
        let method = 'POST'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource, body, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    this.getMany = async function (query = {}) {
        let el = this
        let method = 'GET'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource, undefined, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    this.getOneWhere = async function (query = {}) {
        let el = this
        let method = 'GET'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource, undefined, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    this.getOneById = async function (id = '', query = {}) {
        let el = this
        let method = 'GET'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource + '/' + id, undefined, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    this.findUpdateOrCreate = async function (body = {}, query = {}) {
        let el = this
        let method = 'PUT'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource, body, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    this.findUpdate = async function (body = {}, query = {}) {
        let el = this
        let method = 'PUT'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource, body, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    this.updateById = async function (id = '', body = {}, query = {}) {
        let el = this
        let method = 'PUT'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource + '/' + id, body, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }

    }
    this.findIdAndDelete = async function (id = '', body = {}, query = {}) {
        let el = this
        let method = 'PUT'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource + '/' + id, body, query)
            return resp.data
        } catch (e) {
            console.error(e)
            throw e
        }

    }
    this.datatableAJAX = async function () {
        let el = this
        let method = 'DELETE'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            return {
                url: el.furi + el.resource + '/datatable/',
                type: "POST",
                "dataType": 'json',
                "beforeSend": function (xhr) {
                    xhr.setRequestHeader('authorization', el.token);
                },
            }
        } catch (e) {
            console.error(e)
            throw e
        }

    }
}

try {
    module.exports = codeRagSdk
} catch (e) {

}
