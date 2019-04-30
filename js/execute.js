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
