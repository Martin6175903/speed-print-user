let countClickButton = 0;
const beforeText = document.querySelector('.test__text-print--before');
const firstLetterText = document.querySelector('.test__text-print--focus');
const afterText = document.querySelector('.test__text-print--after');
const saveText = afterText.textContent;

document.querySelector('.test__state-start').addEventListener('click', (event) => {
    countClickButton++;
    if (countClickButton === 1) {
        firstLetterText.textContent = afterText.textContent[0];
        afterText.textContent = [...afterText.textContent].splice(1).join("");
        const btn = document.querySelector('.test__state-start').textContent = 'Начать заново';
    } else {
        afterText.textContent = saveText;
        firstLetterText.textContent = afterText.textContent[0];
        beforeText.textContent = '';
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
            document.querySelector('.test__state-errors').textContent = +document.querySelector('.test__state-errors').textContent + 1;
        }
    }
})
