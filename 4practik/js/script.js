
var slideshowInterval;
var currentIndex = 0;
var images = $('.thumbnail img');
var slideshowSpeed = 3000; // Изначальная скорость слайд-шоу

// При изменении значения ползунка
$('#slideshow-speed').on('input', function() {
    slideshowSpeed = parseInt($(this).val());
    $('#speed-value').text(slideshowSpeed + ' мс');
    restartSlideshow(); // Перезапускаем слайд-шоу с новой скоростью
});

// При клике на кнопку "Слайд-шоу"
$('.slideshow').click(function() {
    startSlideshow();
});

// Запускает слайд-шоу
function startSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }

    slideshowInterval = setInterval(function() {
        var imgSrc = images.eq(currentIndex).attr('src');
        $('.lightbox img').attr('src', imgSrc);
        currentIndex = (currentIndex + 1) % images.length;
    }, slideshowSpeed);
}

// Перезапускает слайд-шоу с новой скоростью
function restartSlideshow() {
    clearInterval(slideshowInterval);
    startSlideshow();
}

/// Проверяем, есть ли сохраненные изображения при загрузке страницы
$(document).ready(function() {
    var savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

    // Добавляем сохраненные изображения на страницу
    for (var i = 0; i < savedImages.length; i++) {
        addImage(savedImages[i]);
    }
});

// При добавлении нового изображения
function addImage(imgSrc) {
    var thumbnail = $('<div class="thumbnail"><img src="' + imgSrc + '"></div>');
    $('.gallery').append(thumbnail);
    thumbnail.click(function() {
        var imgSrc = $(this).find('img').attr('src');
        openFullscreen(imgSrc);
    });

    // Добавляем изображение к сохраненным изображениям
    var savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    savedImages.push(imgSrc);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
}

// При отправке формы загрузки изображения
$('#upload-form').submit(function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('image-upload');
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var imgSrc = e.target.result;
            addImage(imgSrc);
            fileInput.value = ''; // Сбрасываем значение input
        };

        reader.readAsDataURL(file);
    }
});

$('#add-external-image').click(function() {
    var externalImageUrl = $('#external-image-url').val();
    if (externalImageUrl) {
        addImage(externalImageUrl);
        $('#external-image-url').val(''); 
    }
});
const savedImageUrl = localStorage.getItem('savedImageUrl');
if (savedImageUrl) {
    addImageToPage(savedImageUrl);
}

// При применении фильтра
$('#apply-filter').click(function() {
    applyFilter();
});

// Применяет фильтр на основе выбранных тегов
function applyFilter() {
    var selectedTags = $('#tags').val();

    if (selectedTags.length === 0) {

        $('.thumbnail').show();
    } else {

        $('.thumbnail').hide();
        for (var i = 0; i < selectedTags.length; i++) {
            $('.thumbnail:has(img[alt*="' + selectedTags[i] + '"])').show();
        }
    }
}

// При нажатии на кнопку "Удалить все изображения"
$('#delete-all-images').click(function() {
    // Очищаем галерею на странице
    $('.gallery').empty();

    // Очищаем сохраненные изображения в локальном хранилище
    localStorage.removeItem('savedImages');
});
