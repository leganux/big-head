$(document).ready(async function () {

    let callData = async function () {
        let stats = await WS.stats()
        console.log(stats)
        reviewSession(stats)
        if (stats.success && stats.data) {

            let counts = stats?.data?.model_counts.map(function (item, i) {
                return '<li>' + item.name + ': ' + item.count + ' </li>'
            }).join('')
            counts = '<ul>' + counts + '</ul>'

            $('#txtmem').html('<b>Memory:</b><ul>' +
                '<li>Total: ' + stats?.data?.mem_used?.totalMemMb + ' Mb</li>' +
                '<li>Used: ' + stats?.data?.mem_used?.usedMemMb + ' Mb </li>' +
                '<li>Free: ' + stats?.data?.mem_free?.freeMemMb + 'Mb </li>' +
                '</ul>')
            $('#txtdisk').html('<b>CPU:</b><ul>' +
                '<li>Total CPUs: ' + stats?.data?.cpu_count + '</li>' +
                '<li>Free: ' + stats?.data?.cpu_free + '% </li>' +
                '<li>Used: ' + stats?.data?.cpu_usage + '% </li>' +
                '</ul>')
            $('#txtcpu').html('<b>Disk:</b><ul>' +
                '<li>Total: ' + stats?.data?.drive_free?.totalGb + ' Gb</li>' +
                '<li>Free: ' + stats?.data?.drive_free?.freeGb + ' Gb </li>' +
                '<li>Used: ' + stats?.data?.drive_used?.usedGb + ' Gb </li>' +
                '</ul>')
            $('#txtdb').html('<b>Database register count:</b>' + counts)
            $('#txtos').html('<b>Host Info:</b><ul>' +
                '<li>Home folder: ' + stats?.data?.osCmd_whoami + ' </li>' +
                '<li>Net Status: ' + stats?.data?.netstat_inout + '  </li>' +
                '<li>OS info: ' + stats?.data?.os_info + '  </li>' +
                '<li>Uptime: ' + stats?.data?.os_uptime + '  </li>' +
                '<li>Platform: ' + stats?.data?.os_platform + '  </li>' +
                '<li>IP: ' + stats?.data?.os_ip + '  </li>' +
                '<li>Hostname: ' + stats?.data?.os_hostname + '  </li>' +
                '<li>Arch: ' + stats?.data?.os_arch + '  </li>' +
                '</ul>')
        }
    }
    setInterval(async function () {
        callData()
    }, 5000)

    callData()

})
