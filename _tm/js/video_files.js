const play = document.querySelector('.btn__play');
const video = document.querySelector('.video_file video');

play.addEventListener('click', () => {
    video.play();
    video.setAttribute('controls', 'controls');
    play.classList.add('btn__play--hidden');
});