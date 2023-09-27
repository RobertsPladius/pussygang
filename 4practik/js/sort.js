$('#sort').change(function() {
    var sortOption = $(this).val();
    sortImages(sortOption);
});

function sortImages(option) {
    var thumbnailContainer = $('.gallery');
    var thumbnails = thumbnailContainer.find('.thumbnail');
    switch (option) {
        case 'name':
            thumbnails.sort(function(a, b) {
                var nameA = $(a).find('img').attr('alt').toLowerCase();
                var nameB = $(b).find('img').attr('alt').toLowerCase();
                return nameA.localeCompare(nameB);
            });
            break;
        default:
            thumbnails.sort(function(a, b) {
                return $(a).index() - $(b).index();
            });
            break;
    }
    thumbnailContainer.html(thumbnails);
}

// Массив с фоновыми изображениями
var backgroundImages = [
    'https://i.pinimg.com/originals/c0/48/cf/c048cfb400aed0cfb9c29227706fc2f2.jpg',
    'https://www.designyourway.net/drb/wp-content/uploads/2017/04/Nature-Wallpaper-Desktop-Background-120-1600x900.jpg',
    'background3.jpg',
    // Добавьте пути к вашим фоновым изображениям
];

var currentBackgroundIndex = 0;

// При клике на кнопку "Сменить фон"
$('#change-background').click(function() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    changeBackground(backgroundImages[currentBackgroundIndex]);
});

// Функция для смены фонового изображения
function changeBackground(imageUrl) {
    $('body').css('background-image', 'url(' + imageUrl + ')');
}