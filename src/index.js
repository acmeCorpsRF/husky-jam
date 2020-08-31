import './style.scss';

let parentBlock = document.getElementById('block'),
    countElements = 0,
    elementWidth = 50,
    elementHeight = 50,
    currentRow = 0,
    numberOfExactlyDropped = 0,
    numberElementsFillLine = 0,
    sumElementWidths = 0,
    initialWindiwWidth = window.innerWidth;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("resize", () => {
    let currentWindiwWidth = window.innerWidth;
    if (initialWindiwWidth < currentWindiwWidth) {
        currentRow = 0;
        sumElementWidths = 0;
        numberOfExactlyDropped = 0;
        initialWindiwWidth = currentWindiwWidth;
    }
});

window.addEventListener('scroll', () => {
    let parentBlockHeight = parentBlock.clientHeight,
        numberRows = parentBlockHeight / elementHeight,
        windowWidth = window.innerWidth,
        cherry = document.createElement('div'),
        leaf = document.createElement('div');
    numberElementsFillLine = Math.ceil(windowWidth / elementWidth);
    cherry.style.width = elementWidth;
    cherry.style.height = elementHeight;
    cherry.classList.add('cherry', 'falling-block');
    leaf.classList.add('leaf', 'falling-block');
    if ((numberOfExactlyDropped !== numberElementsFillLine)) {
        if (countElements % 3 === 0) {
            cherry.style.left = sumElementWidths + 'px';
            if (countElements % 2 === 0) {
                cherry.style.animationName = `falling${currentRow + 1}, rotateOdd`;
            } else {
                cherry.style.animationName = `falling${currentRow + 1}, rotateEven`;
            }
            sumElementWidths += elementWidth;
            parentBlock.appendChild(cherry);
            numberOfExactlyDropped++;
        } else if (Number.isInteger(countElements / 20)) {
            leaf.style.animationName = `falling${currentRow + 1}, sway`;
            leaf.style.left = getRandomIntInclusive(-elementWidth, windowWidth + elementWidth) + 'px';
            parentBlock.appendChild(leaf);
        } else {
            if (countElements % 2 === 0) {
                cherry.style.animationName = `falling${currentRow + 1}, rotateOdd`;
            } else {
                cherry.style.animationName = `falling${currentRow + 1}, rotateEven`;
            }
            cherry.style.left = getRandomIntInclusive(-elementWidth, windowWidth + elementWidth) + 'px';
            parentBlock.appendChild(cherry);
        }
        countElements++;
    } else {
        currentRow++;
        if (numberRows * 1.5 > currentRow) {
            sumElementWidths = 0;
            numberOfExactlyDropped = 0;
        }
    }
});