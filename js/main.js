document.querySelector('.test__state-start').addEventListener('click', () => {
    let firstLetterText = document.querySelector('.test__text-print--after');
    console.log(firstLetterText.firstChild.textContent);
})
