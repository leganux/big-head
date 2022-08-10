$(document).ready(async function () {
    let UPDATE = '';
    $.fn.dataTable.ext.errMode = 'none';

    let dataAjax = await WS.setResource(pagename).datatableAJAX()

    let columns = [
        {
            "data": "_id"
        }
    ]

    for (let item of fields) {
        columns.push({
            "data": item.name,
            render: function (data) {
                if (item.type == 'oid' || item.type == 'array_oid') {
                    return JSON.stringify(data)
                } else {
                    return data
                }
            }
        })
    }

    columns.push({
        "data": "_id",
        "render": function (data, v_, row) {
            return '<button value="' + data + '" class="btn btn-primary text-warning btn-block update_element"> <i class="fas fa-edit"></i></button>' +
                '<button value="' + data + '" class="btn btn-primary text-danger btn-block delete_element"> <i class="fas fa-trash"></i></button>'
        }
    })

    let DT = $("#datatable").DataTable({
        "responsive": true,
        initComplete: function () {
            $(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');
        },
        "searching": true,
        "data": [],
        dom: 'Bfrtip',
        lengthMenu: [
            [10, 25, 50, 100, 1000],
            ['10 rows', '25 rows', '50 rows', '100 rows', '1000 rows']
        ],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print', 'colvis', 'pageLength',
        ],
        "columns": columns,
        processing: true,
        serverSide: true,
        ajax: dataAjax
    });

    let clear = async function () {
        for (let item of fields) {
            if (item.type == 'string' || item.type == 'number' || item.type == 'any') {
                $('#f_' + item.name).val('')
            }
            if (item.type == 'boolean') {
                $('#f_' + item.name).prop('checked', false)
            }
            if (item.type == 'oid' || item.type == 'array_oid') {
                let rel = await WS.setResource(item.rel).getMany()
                reviewSession(rel)
                if (rel.success) {
                    for (let jtem of rel.data) {
                        $('#f_' + item.name).append('<option value="' + jtem._id + '">' + JSON.stringify(jtem) + '</option>')
                    }
                    $('#f_' + item.name).select2({
                        placeholder: 'Select an option ok ' + item.name,
                        width: "100%"
                    })
                }

            }
        }
    }

    $('#new').click(async function () {
        await clear()
        $('#new_edit').modal('show')
        UPDATE = ''
    })

    $('#save').click(async function () {
        let body = {}
        for (let item of fields) {
            if (item.type == 'number' || item.type == 'string' || item.type == 'any') {
                body[item.name] = $('#f_' + item.name).val()
            }
            if (item.type == 'oid') {
                body[item.name] = $('#f_' + item.name).val();

            }
            if (item.type == 'array_oid') {
                body[item.name] = $('#f_' + item.name).val();
            }
            if (item.type == 'boolean') {
                body[item.name] = $('#f_' + item.name).prop('checked')
            }
        }
        if (UPDATE == '') {
            await WS.setResource(pagename).createOne(body)
        } else {
            await WS.setResource(pagename).updateById(UPDATE, body)
        }
        DT.draw()


        $('#new_edit').modal('hide')
        UPDATE = ''
    })

    $(document.body).on('click', '.delete_element', async function () {
        let id = $(this).val()
        if (confirm("Are you sure? This action has not return")) {
            await WS.findIdAndDelete(id)
            DT.draw()
        }
    })

    $(document.body).on('click', '.update_element', async function () {
        UPDATE = $(this).val()
        await clear()
        $('#new_edit').modal('show')

        let data = await WS.setResource(pagename).getOneById(UPDATE, {populate: true})
        reviewSession(data)
        if (data.success && data.data) {
            for (let item of fields) {
                if (data.data[item.name]) {
                    if (item.type == 'number' || item.type == 'string' || item.type == 'any') {
                        $('#f_' + item.name).val(data.data[item.name])
                    }
                    if (item.type == 'oid') {
                        $('#f_' + item.name).val(data.data[item.name])
                        $('#f_' + item.name).trigger('change');
                    }
                    if (item.type == 'array_oid') {
                        let ids = data.data[item.name].map(function () {
                            return item._id
                        })
                        $('#f_' + item.name).val(ids)
                        $('#f_' + item.name).trigger('change');
                    }
                    if (item.type == 'boolean') {
                        $('#f_' + item.name).prop('checked', data.data[item.name])
                    }
                }


            }
        }


    })


})
