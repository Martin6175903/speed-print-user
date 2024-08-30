let countClickButton = 0;
const beforeText = document.querySelector('.test__text-print--before');
const firstLetterText = document.querySelector('.test__text-print--focus');
const afterText = document.querySelector('.test__text-print--after');
const saveText = afterText.textContent;
const accuracyElem = document.querySelector('.test__state-accuracy');
const errorsElem = document.querySelector('.test__state-errors');
let countTime = 0;
let startTimeSpeed = null;

document.querySelector('.test__state-start').addEventListener('click', startTest);
document.querySelector('.modal__reload').addEventListener('click', testReload);
document.body.querySelector('.wrapper').addEventListener('keydown', printText);

function printText(event) {
    const key = event.key;
    event.preventDefault();
    if (event.key === firstLetterText.textContent || (event.code === 'Digit2' && event.shiftKey)) {
        if (countTime === 0) {
            startTimeSpeed = new Date().getTime();
            countTime++;
        }
        beforeText.textContent += firstLetterText.textContent;
        firstLetterText.textContent = afterText.textContent.slice(0,1);
        afterText.textContent = afterText.textContent.slice(1);
        if (saveText.length === beforeText.textContent.length) {
            let endTimeSpeed = new Date().getTime();
            document.querySelector('.modal__result-speed span:nth-child(2)').textContent = Math.round(((endTimeSpeed - startTimeSpeed) / 60) * saveText.length);
        }
    } else {
        if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Tab') {
            return 0;
        } else {
            document.querySelector('.test__state-errors').textContent = +errorsElem.textContent + 1;
            document.querySelector('.modal__result-errors').lastElementChild.textContent = errorsElem.textContent;
            accuracy(saveText, document.querySelector('.modal__result-accuracy'));
        }
    }
    if (saveText.length === beforeText.textContent.length) {
        document.querySelector('.modal').style.visibility = 'visible';
    }
}

function startTest(event) {
    countClickButton++;
    if (countClickButton === 1) {
        firstLetterText.textContent = afterText.textContent[0];
        afterText.textContent = [...afterText.textContent].splice(1).join("");
        document.querySelector('.test__state-start').textContent = 'Начать заново';
    } else {
        afterText.innerHTML = saveText.slice(1);
        firstLetterText.innerHTML = saveText[0];
        beforeText.innerHTML = '';
        accuracyElem.firstElementChild.textContent = '100';
        errorsElem.textContent = '0';
        document.querySelector('.modal__result-accuracy').lastElementChild.textContent = '100%';
        document.querySelector('.modal__result-errors').lastElementChild.textContent = '0';
    }
}

function testReload(event) {
    afterText.innerHTML = saveText.slice(1);
    firstLetterText.innerHTML = saveText[0];
    beforeText.innerHTML = '';
    accuracyElem.firstElementChild.textContent = '100';
    errorsElem.textContent = '0';
    document.querySelector('.modal__result-accuracy').lastElementChild.textContent = '100%';
    document.querySelector('.modal__result-errors').lastElementChild.textContent = '0';
    document.querySelector('.modal').style.visibility = 'hidden';
}

function accuracy(fullText, modalElem) {
    const sucess = +accuracyElem.firstElementChild.textContent;
    const lenText = (1 / fullText.length) * 100;
    const result = Math.round((sucess - lenText)*10) / 10;
    const elemAccuracy = accuracyElem.firstElementChild;
    elemAccuracy.textContent = result;
    modalElem.lastElementChild.textContent = result + "%";
}
