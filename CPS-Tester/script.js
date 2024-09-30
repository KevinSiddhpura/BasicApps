document.addEventListener('DOMContentLoaded', () => {
    const selectTime = document.getElementById('select-time');
    const resetBtn = document.querySelector('.reset-btn');
    const clickArea = document.querySelector('.click-area');
    const cpsResult = document.querySelector('.cps-result');
    const clickCountSpan = document.querySelector('.click-count');
    const cpsSpan = document.querySelector('.cps');
    const initialText = document.querySelector('.initial');

    const resetText = 'Start Clicking Here!';
    let clickCount = 0;
    let timer = null;
    let isRunning = false;

    clickArea.addEventListener('click', () => {
        if (!isRunning) {
            startTest();
        } else {
            if (clickArea.classList.contains('disabled')) return;
            clickCount++;
            clickCountSpan.textContent = clickCount;
        }
    });

    resetBtn.addEventListener('click', resetTest);

    function startTest() {
        if (clickArea.classList.contains('disabled')) return;

        clickCount = 0;
        clickCountSpan.textContent = clickCount;
        clickArea.classList.add('active');
        cpsSpan.textContent = 0;
        cpsResult.classList.add('hidden');
        initialText.textContent = 'Keep Clicking!';
        isRunning = true;

        const duration = parseInt(selectTime.value, 10) * 1000;
        timer = setTimeout(() => {
            clickArea.classList.add('disabled');
            endTest();
        }, duration);
    }

    function endTest() {
        isRunning = false;
        const duration = parseInt(selectTime.value, 10);
        const cps = (clickCount / duration).toFixed(2);
        cpsSpan.textContent = cps;
        cpsResult.classList.remove('hidden');
        clickArea.classList.remove('active');
        initialText.textContent = 'You did great!';
    }

    function resetTest() {
        clickArea.classList.remove('active', 'disabled');
        clearTimeout(timer);
        clickCount = 0;
        clickCountSpan.textContent = clickCount;
        cpsSpan.textContent = 0;
        cpsResult.classList.add('hidden');
        initialText.textContent = resetText;
        isRunning = false;
    }
});