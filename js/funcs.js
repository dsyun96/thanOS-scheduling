
function getRandomColor() {
    let  letters = '0123456789ABCDEF';
    let  color = '#';

    for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];

    return color;
}

function setColors(colors, cntProcess) {
    for(let i = 1; i<=cntProcess; ++i)
        colors.push(getRandomColor());
}
