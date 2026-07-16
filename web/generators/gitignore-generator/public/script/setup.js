document.addEventListener('DOMContentLoaded', (event) => {
    const input = document.querySelector('input');
    const button = document.querySelector('button');

    button.addEventListener('click', (event) => {
        const value = input.value;
        if (value === '') {
            alert('Please enter a valid value');
            return;
        }
    });

    if (input) {
        input.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                button.click();
            }
        });
    }

    const copyButton = document.querySelector('#copy');

    if (copyButton) {
        copyButton.addEventListener('click', handleCopy);
    }

    function handleCopy() {
        const content = document.querySelector('#mark');
        const value = content.innerText;
        navigator.clipboard.writeText(value);
    }

    const downloadButton = document.querySelector('#download');

    if (downloadButton) {
        downloadButton.addEventListener('click', handleDownload);
    }

    function handleDownload() {
        const content = document.querySelector('#mark');
        const value = content.innerText;
        const blob = new Blob([value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '.gitignore';
        a.click();
        URL.revokeObjectURL(url);
    }

});
