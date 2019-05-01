/*
입력:
프로세스개수 n
도착시간배열 arrivals[2, 5, ...]
수행시간배열 bursts[3, 7, ...]
출력:
대기시간배열 waitings[]
수행시간배열 turnArounds[]
프로세서상태 pStates[ [processIdx, timeStart, timeStay], ... ]
*/

function FCFS(cntProcess, arrivals, bursts) {
    let processes = [];
    for (let i = 1; i <= cntProcess; ++i) {
        processes.push([i, arrivals[i], bursts[i]]);
    }

    processes.sort((a, b) => a[1] - b[1] ? a[1] - b[1] : a[0] - b[0]);

    let waitings = [null], turnArounds = [null], pStates = [];
    let time = 0;

    for (let i = 0; i < cntProcess; ++i) {
        // i번째로 들어온 프로세스 수행
        let now = processes[i];

        if (time < now[1]) {
            pStates.push([null, time, now[1] - time]);
            time = now[1];
        }

        turnArounds[now[0]] = time + now[2] - now[1];
        waitings[now[0]] = turnArounds[now[0]] - bursts[now[0]];
        pStates.push([now[0], time, now[2]]);

        time += now[2];
    }

    return [waitings, turnArounds, pStates];
}


function GetProcesses(cntProcess, arrivals, bursts) {
    let processes = [];
    for (let i = 1; i <= cntProcess; ++i) {
        processes.push({pid: i, arrival: arrivals[i], burst: bursts[i]});
    }
    return processes;
}

function SPN(cntProcess, arrivals, bursts) {
    let processes = GetProcesses(cntProcess, arrivals, bursts);
    processes.sort(function (a, b) {
        let diff = a.arrival - b.arrival;
        if (diff)
            return diff;
        diff = a.burst - b.burst;
        if (diff)
            return diff;
        return a.pid - b.pid;
    });

    let waitings = [null], turnArounds = [null], pStates = [];
    let time = 0;
    processes.forEach(function (now) {
        if (time < now.arrival) {
            pStates.push([null, time, now.arrival - time]);
            time = now.arrival;
        }
        turnArounds[now.pid] = time + now.burst - now.arrival;
        waitings[now.pid] = turnArounds[now.pid] - bursts[now.pid];
        pStates.push([now.pid, time, now.burst]);
        time += now.burst;
    });
    return [waitings, turnArounds, pStates];
}

function RR(cntProcess, arrivals, bursts, tqu) { //tqu : Time QUantum
    let processes = GetProcesses(cntProcess, arrivals, bursts);
    processes = processes.map(p => {
        return {pid: p.pid, arrival: p.arrival, burst: p.burst, remain: p.burst};
    });
    processes.sort((a, b) => a.arrival - b.arrival ? a.arrival - b.arrival : a.pid - b.pid);

    let waitings = [null], turnArounds = [null], pStates = [];
    let time = 0;
    let queue = [];

}

function SRTN(cntProcess, arrivals, bursts) {
    let processes = GetProcesses(cntProcess, arrivals, bursts);
}


function HRRN(cntProcess, arrivals, bursts) {
    let processes = GetProcesses(cntProcess, arrivals, bursts);
}

