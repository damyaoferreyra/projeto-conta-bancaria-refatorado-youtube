class WriterMachine {
    writer = () => {
        const animationTags = document.querySelectorAll('.animation-write');

        animationTags.forEach(tags => {
            const titleLetter = tags.innerText.split('')
            tags.innerText = ''

            titleLetter.forEach((letra, i) => {
                setTimeout(() => {
                    tags.innerHTML += letra;
                    if (i === titleLetter.length - 1) {
                        tags.classList.remove('animation-write')
                    }
                }, i * 25)
            })
        })

        return this;
    }

    observer = () => {
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    this.writer()
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

}

new WriterMachine().writer().observer()