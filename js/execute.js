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

function getProcesses(cntProcess, arrivals, bursts) {
    let processes = [];
    for (let i = 1; i <= cntProcess; ++i) {
        processes.push({pid: i, arrival: arrivals[i], burst: bursts[i]});
    }
    return processes;
}

function FCFS(cntProcess, arrivals, bursts) {
    let processes = getProcesses(cntProcess, arrivals, bursts);
    processes.sort((a, b) => a.arrival - b.arrival ? a.arrival - b.arrival : a.pid - b.pid);
    
    let waitings = [null], turnArounds = [null], pStates = [];
    let time = 0;

    for (let i = 0; i < cntProcess; ++i) {
        // i번째로 들어온 프로세스 수행
        let now = processes[i];

        if (time < now.arrival) {
            pStates.push([null, time, now.arrival - time]);
            time = now.arrival;
        }

        turnArounds[now.pid] = time + now.burst - now.arrival;
        waitings[now.pid] = turnArounds[now.pid] - bursts[now.pid];
        pStates.push([now.pid, time, now.burst]);

        time += now.burst;
    }

    return [waitings, turnArounds, pStates];
}

function SRTN(cntProcess, arrivals, bursts) {
    let processes = getProcesses(cntProcess, arrivals, bursts);
    let waitings = [null], turnArounds = [null], pStates = [];
    let time = 0;
    
    arrivals = Array.from(new Set(arrivals));
    arrivals.pop();
    arrivals.push(1e200);
    
    for (let i = 0; i < arrivals.length - 1; ++i) {
        // eventTime = 이벤트가 발생한 시간
        let eventTime = arrivals[i];
        let tmpProc = [];
        let nextTime = arrivals[i + 1];
        
        for (let j = 0; j < cntProcess; ++j)
            if (processes[j].arrival <= eventTime) tmpProc.push(j);
        
        // 지금부터 다음 이벤트가 발생하기 전까지는 burst 가장 짧은 놈을 계속 돌린다
        while (time < nextTime) {
            if (time < eventTime) {
                pStates.push([null, time, eventTime - time]);
                time = eventTime;
            }
            
            let idx = -1, max = 1e200;
            for (let j = 0; j < tmpProc.length; ++j) {
                let now = processes[tmpProc[j]];
                if (now.burst < max) {
                    max = now.burst;
                    idx = tmpProc[j];
                }
            }
            
            // idx번째가 가장 짧은 놈
            let exec = Math.min(nextTime - time, processes[idx].burst);
            pStates.push([idx, time, exec]);
            time += exec;
            processes[idx].burst -= exec;
        }
    }
    
    return [waitings, turnArounds, pStates];
}
