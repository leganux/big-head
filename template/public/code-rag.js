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
    this.f_error = function (e) {
        console.error('An error has been occurred', e)
    }
    if (options.f_error && typeof options.f_error == 'function') {
        this.f_error = options.f_error
    }
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

                        break;
                    case 'GET':
                        response = await axios.get(url, {headers})

                        break;
                    case 'PUT':
                        response = await axios.put(url, body, {headers})

                        break;
                    case 'DELETE':
                        response = await axios.delete(url, {headers})

                        break;
                    case 'OPTIONS':
                        response = await axios.options(url, {headers})

                        break;
                    case 'PATCH':
                        response = await axios.patch(url, body, {headers})

                        break;
                }
                return response.data

            } else {


                headers['Content-Type'] = 'application/json';
                headers['Accept'] = 'application/json';

                switch (method.toUpperCase()) {
                    case 'POST':
                        console.log('entra')

                        response = await fetch(url, {
                            method: 'POST',
                            headers,
                            body: JSON.stringify(body),
                        })
                        if (response.ok) {
                            response = response.json()
                        } else {
                            response = Promise.reject(response);
                        }


                        break;
                    case 'GET':
                        response = await fetch(url, {
                            method: 'GET',
                            headers

                        })
                        if (response.ok) {
                            response = response.json()
                        } else {
                            response = Promise.reject(response);
                        }

                        break;
                    case 'PUT':
                        response = await fetch(url, {
                            method: 'PUT',
                            headers,
                            body: JSON.stringify(body),
                        })
                        if (response.ok) {
                            response = response.json()
                        } else {
                            response = Promise.reject(response);
                        }

                        break;
                    case 'DELETE':
                        response = await fetch(url, {
                            method: 'DELETE',
                            headers,
                            body: JSON.stringify(body),
                        })
                        if (response.ok) {
                            response = response.json()
                        } else {
                            response = Promise.reject(response);
                        }

                        break;
                    case 'OPTIONS':
                        response = await fetch(url, {
                            method: 'OPTIONS',
                            headers,
                            body: JSON.stringify(body),
                        })
                        if (response.ok) {
                            response = response.json()
                        } else {
                            response = Promise.reject(response);
                        }
                        break;
                    case 'PATCH':
                        response = await fetch(url, {
                            method: 'PATCH',
                            headers,
                            body: JSON.stringify(body),
                        })
                        if (response.ok) {
                            response = response.json()
                        } else {
                            response = Promise.reject(response);
                        }
                        break;
                }
                return await response
            }

        } catch (e) {
            if (e.status == 403) {
                console.log('Close session')
                el.logout()
            }
            el.f_error(e)
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
            throw  e
        }
    }
    this.stats = async function () {
        let el = this
        try {
            let STATS = await el.executor('GET', undefined, 'STATS', undefined, undefined)
            return STATS
        } catch (e) {
            throw e
        }
    }
    this.login = async function ($password_ = '', $user_ = '', saveInLocalStorage = true) {
        let el = this
        let method = 'POST'

        let body = {
            user: $user_,
            pass: $password_
        }

        try {
            let resp = await el.executor(method, undefined, 'login', body, undefined)
            if (resp.success) {
                el.token = 'Bearer ' + resp.data.token
                el.presentAuth = true
                if (saveInLocalStorage) {
                    try {
                        localStorage.setItem('code-rag-token', el.token)
                        localStorage.setItem('code-rag-user', JSON.stringify(resp.data.user))
                    } catch (e) {
                    }
                }
            }
            return resp
        } catch (e) {
            console.error('Login error', e)
            throw e
        }

    }
    this.verify = async function (token) {
        let el = this
        let method = 'POST'
        let token_ = ''
        try {
            token_ = localStorage.getItem('code-rag-token')
        } catch (e) {

        }
        try {

            token_ = token_ || token
            if (!token_) {
                throw new Error('Token undefined')

            }

            if (token_.includes('Bearer')) {
                token_ = token_.replace('Bearer ', '')
            }

            let resp = await el.executor(method, undefined, 'verify', {token: token_}, undefined)
            if (resp.success) {
                let user = resp.data.user
                user = JSON.stringify(user)
                try {
                    localStorage.setItem('code-rag-user', user)

                } catch (e) {

                }
            }
            return resp
        } catch (e) {
            console.error('token error', e)
            throw e
        }

    }
    this.register = async function (role, data = {}) {

        if (!data.user || !data.pass || !data.email || data.user.trim() == '' || data.pass.trim() == '' || data.email.trim() == '') {
            throw  new Error('Be sure user, email and pass is added')
        }
        if (!data.email.includes('@') || !data.email.includes('.')) {

            throw  new Error('Invalid mail format')
        }
        if (data.pass.length < 8) {
            throw  new Error('Password must be al least 8 characters')
        }
        let el = this
        let method = 'POST'
        try {
            let resp = await el.executor(method, undefined, 'register/' + role, data, undefined)
            if (resp.success) {
                console.log('Register success')
                return true
            }
            return resp
        } catch (e) {
            console.error('we,can not register user', e)
            throw e
        }

    }
    this.forgotPassword = async function (email = '') {

        let el = this
        if (!email.includes('@') || !email.includes('.')) {

            throw  new Error('Invalid mail format')
        }

        let method = 'POST'
        try {
            let resp = await el.executor(method, undefined, 'forgotPassword/', {email}, undefined)
            if (resp.success) {
                console.log('Email send correctly')
                return true
            }
            return resp
        } catch (e) {
            console.error('we,can not send mail to  user', e)
            throw e
        }

    }
    this.new_password = async function (email = '', password = '', password2 = '', code = '') {

        let el = this
        if (!email.includes('@') || !email.includes('.')) {
            throw  new Error('Invalid mail format')
        }
        if (password.length < 8) {
            throw  new Error('Password must be al least 8 characters')
        }
        if (password2 !== password) {
            throw  new Error('Passwords do not match')
        }

        let method = 'POST'
        try {
            return await el.executor(method, undefined, 'new_password/', {}, {
                email,
                password,
                password2,
                code
            })


        } catch (e) {
            console.error('we,can not send mail to  user', e)
            throw e
        }

    }
    this.logout = async function (removeFromLocalStorage = true) {
        let el = this
        el.token = 'Bearer NONE'
        if (removeFromLocalStorage) {
            try {
                localStorage.removeItem('code-rag-token')
                localStorage.removeItem('code-rag-user')
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
            return resp
        } catch (e) {
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
            return resp
        } catch (e) {

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
            return resp
        } catch (e) {

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
            return resp
        } catch (e) {

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
            return resp
        } catch (e) {

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
            return resp
        } catch (e) {

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
            return resp
        } catch (e) {

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
            return resp
        } catch (e) {

            throw e
        }

    }
    this.findIdAndDelete = async function (id = '', body = {}, query = {}) {
        let el = this
        let method = 'DELETE'
        if (!el.resource) {
            throw new Error('Resource not selected')
            return
        }
        try {
            let resp = await el.executor(method, undefined, el.resource + '/' + id, body, query)
            return resp
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
                url: el.furi + el.resource + '/datatable/?populate=true',
                type: "POST",
                "dataType": 'json',
                "beforeSend": function (xhr) {
                    xhr.setRequestHeader('authorization', el.token);
                },
            }
        } catch (e) {

            throw e
        }

    }
}
try {
    module.exports = codeRagSdk
} catch (e) {
}
