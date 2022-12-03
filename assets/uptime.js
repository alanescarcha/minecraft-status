fetch("./assets/servers.json")
    .then(response => {
        return response.json();
    })
    .then(async (jsondata) => {
        let status;
        function getTotalSys(data) {
            let total = 0;
            for (let i = 0; i < Object.keys(data).length; i++) {
                console.log(data[Object.keys(data)[i]].lenght)
                console.log(data[Object.keys(data)[i]])
                total += data[Object.keys(data)[i]][49].status;
            }
            switch (total) {
                case Object.keys(data).length:
                    return document.querySelector(".status").innerHTML = `<i id="sysStatus" class="bi bi-check-circle-fill text-success"></i> All Systems Online`;
                case 0:
                    return document.querySelector(".status").innerHTML = `<i id="sysStatus" class="bi bi-x-circle-fill text-danger"></i> All Systems Down`;
                default:
                    return document.querySelector(".status").innerHTML = `<i id="sysStatus" class="bi bi-exclamation-circle-fill text-warning"></i> Some Systems Down`;
            }
        }
        function getStatus(code) {
            switch (code.status) {
                case 1:
                    return {
                        tag: `<i class="bi bi-square-fill text-success" data-bs-toggle="tooltip" data-bs-placement="top" title="${code.ping}ms | ${code.time}"></i>`,
                        bgColor: 'bg-success'
                    }
                case 2:
                    return {
                        tag: `<i class="bi bi-square-fill text-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="${code.time}"></i>`,
                        bgColor: 'bg-warning'
                    }
                case 0:
                    return {
                        tag: `<i class="bi bi-square-fill text-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="${code.time}"></i>`,
                        bgColor: 'bg-danger'
                    }
                default:
                    return {
                        tag: '<i class="bi bi-square-fill text-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="No data | ${code.time}"></i>',
                        bgColor: 'bg-secondary'
                    }
            }
        }
        function getPorcentage(num) {
            if (num == 1) return 100
            num = num * 100
            return num.toFixed(2);
        }
        await fetch('https://status.vexyhost.com/api/status-page/heartbeat/minecraft')
            .then(response => response.json())
            .then(data => status = data);
        getTotalSys(status.heartbeatList);
        for (let i = 0; i < Object.keys(jsondata.servers).length; i++) {
            let server = jsondata.servers[i];
            let serverStatus = status.heartbeatList[server.heartbeat];
            let html = `<div class="monitor-list mt-4">
            <div class="item ">
                <div class="row row-cols-1 gap-5 row-cols-sm-2 gap-sm-0">
                    <div class="col-9 col-md-8">
                        <div class="info">
                            <span class="badge rounded-pill ${getStatus(serverStatus[49]).bgColor} align-middle">${getPorcentage(status.uptimeList[server.uptime])}%</span> ${server.name}
                        </div>
                    </div>
                    <div class="col-3 col-md-4 col-responsive">
                        <div class="hp-bar">
                            ${getStatus(serverStatus[37]).tag}
                            ${getStatus(serverStatus[38]).tag}
                            ${getStatus(serverStatus[39]).tag}
                            ${getStatus(serverStatus[40]).tag}
                            ${getStatus(serverStatus[41]).tag}
                            ${getStatus(serverStatus[42]).tag}
                            ${getStatus(serverStatus[43]).tag}
                            ${getStatus(serverStatus[44]).tag}
                            ${getStatus(serverStatus[45]).tag}
                            ${getStatus(serverStatus[46]).tag}
                            ${getStatus(serverStatus[47]).tag}
                            ${getStatus(serverStatus[48]).tag}
                            ${getStatus(serverStatus[49]).tag}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            document.querySelector("#monitors").innerHTML += html;
        }
    })
