let countClickButton = 0;
const beforeText = document.querySelector('.test__text-print--before');
const firstLetterText = document.querySelector('.test__text-print--focus');
const afterText = document.querySelector('.test__text-print--after');
const saveText = afterText.textContent;
const speedElem = document.querySelector('.test__state-speed');
const accuracyElem = document.querySelector('.test__state-accuracy');
const errorsElem = document.querySelector('.test__state-errors');
const lenText = saveText.length;



document.querySelector('.test__state-start').addEventListener('click', (event) => {
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
})

document.body.querySelector('.wrapper').addEventListener('keydown', (event) => {
    const key = event.key;
    event.preventDefault();
    if (event.key === firstLetterText.textContent || (event.code === 'Digit2' && event.shiftKey)) {
        beforeText.textContent += firstLetterText.textContent;
        firstLetterText.textContent = afterText.textContent.slice(0,1);
        afterText.textContent = afterText.textContent.slice(1);
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
})

function accuracy(fullText, modalElem) {
    const sucess = +accuracyElem.firstElementChild.textContent;
    const lenText = (1 / fullText.length) * 100;
    const result = Math.round((sucess - lenText)*10) / 10;
    console.log(result);
    const elemAccuracy = accuracyElem.firstElementChild;
    elemAccuracy.textContent = result;
    modalElem.lastElementChild.textContent = result + "%";
}
