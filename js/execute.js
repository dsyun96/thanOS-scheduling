/*
입력: 프로세스개수 n 도착시간배열 arrivals[2, 5, ...] 수행시간배열 bursts[3, 7, ...]
출력: 대기시간배열 w[] 반환시간배열 t[] 프로세서상태 p[[processIdx, timeStart, timeStay], ...]
 */

function FCFS(n, arrivals, bursts) {
    let processes = [];
    for (let i = 0; i < n; ++i) processes.push([i, arrivals[i], bursts[i]]);
    processes.sort((a, b) => a[1] - b[1] ? a[1] - b[1] : a[0] - b[0]);

    let waiting = [], turnAround = [], pState = [];
    let time = 0;

    for (let i = 0; i < n; ++i) {
        // i번째로 들어온 프로세스 수행
        let now = processes[i];

        turnAround[now[0]] = time + now[2] - now[1];
        waiting[now[0]] = turnAround[now[0]] - bursts[now[0]];
        pState.push([now[0], time, now[2]]);

        time += now[2];
    }

    return [waiting, turnAround, pState];
}
