document.querySelectorAll('.thumbnail img').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        const mainImage = document.querySelector('#main-picture-container img');
        mainImage.src = thumbnail.src;

        document.querySelectorAll('.thumbnail').forEach((thumb) => {
            thumb.classList.remove('selected');
        });

        thumbnail.parentElement.classList.add('selected');
    });
});
