const play = document.querySelector('.video__btn-play');
const video = document.querySelector('.video');

play.addEventListener('click', () => {
    video.play();
    play.classList.add('.video__btn-play--hidden');
});