function FCFS(processes) {
    processes = [["P1", 0, 1], ["P2", 1, 1], ["P3", 0, 2]]; //나중에 삭제 예정
    let result = [];
    processes.sort((a, b) => a[1] - b[1] ? a[1] - b[1] : a[0] - b[0]);
    processes.forEach((a) => result.push([a[0], a[2]]));
    return result;
}