$(document).ready(function() {
    // При клике на миниатюру открываем большое изображение
    $('.thumbnail').click(function() {
        var imgSrc = $(this).find('img').attr('src');
        $('.lightbox img').attr('src', imgSrc);
        $('.lightbox').fadeIn();
    });

    // При клике на крестик закрываем большое изображение
    $('.close').click(function() {
        $('.lightbox').fadeOut();
    });
});


// При клике на кнопку "Полноэкранный режим"
$('.fullscreen').click(function() {
    var imgSrc = $('.lightbox img').attr('src');
    openFullscreen(imgSrc);
});

// Открывает изображение в полноэкранном режиме
function openFullscreen(imgSrc) {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }

    // Загружаем изображение в полноэкранном режиме
    var fullscreenImg = new Image();
    fullscreenImg.src = imgSrc;
    fullscreenImg.classList.add('fullscreen-image');
    $('.fullscreen-image-container').html(fullscreenImg);
}