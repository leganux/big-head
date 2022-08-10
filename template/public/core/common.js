let WS = {}
$(document).ready(async function () {
    try {
        if (!api_url_base || api_url_base == '') {
            alert('Ocurrio un error, base url no declarada')
            return
        }
        let options = {
            f_error: async function (e) {
                console.error(e)
            }
        }

        WS = new codeRagSdk(api_url_base, api_base_path, options)
        console.log(await WS.discover())

    } catch (e) {
        alert('Ocurrio un error, al descubrir el servidor')
        return
    }
    $("#closeSession").click(function () {
        WS.logout(true)
        location.href = '/'
    })
    if (!localStorage.getItem('code-rag-token')) {
        $("#closeSession").click()
    }
})

const reviewSession = function (data) {
    if (!data.success && data.code == 403) {
        if (data.type && data.type == 1) {
            WS.logout(true)
            location.href = '/'
        }
    }

}

setTimeout(function () {
    $('.btn-secondary').addClass('btn-primary').addClass('text-secondary').removeClass('btn-secondary')

}, 500)
