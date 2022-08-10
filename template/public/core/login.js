$(document).ready(async function () {

    $('#login').click(async function () {
        let user = $('#user').val()
        let pass = $('#pass').val()
        try {
            let user_ = await WS.login(pass, user, true)
            if (user_ && user_.success) {
                location.href = '/dashboard'
            } else {
                alert('Ocurrio un error al iniciar sesión')
                WS.logout(true)
                //location.href = '/'
            }
        } catch (e) {
            alert('Ocurrio un error al iniciar sesión')
            WS.logout(true)
            //location.href = '/'
        }
    })


})
