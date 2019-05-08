function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; ++i)
        color += letters[Math.floor(5 + Math.random() * 7)];

    return color;
}

function setColors(colors, cntProcess) {
    for(let i = 1; i <= cntProcess; ++i) {
        colors.push(getRandomColor());
        for(let j = 1; j<i; j++)
        {
            if(colors[i]==colors[j])
                i--;
            break;
        }
    }
}
