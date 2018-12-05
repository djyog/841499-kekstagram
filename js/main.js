'use strict';

var PHOTOS_NUMBER = 25;

var MIN_LIKES = 15;

var MAX_LIKES = 200;

var MIN_COMMENT_STRINGS = 1;

var MAX_COMMENT_STRINGS = 2;

var COMMENTS_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS_ARRAY = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var photosArray = getPhotosArray();

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length)];
};

var getRandomComment = function (array) {
  var length = getRandomInteger(MIN_COMMENT_STRINGS, MAX_COMMENT_STRINGS + 1);
  var comment = '';
  for (var i = 0; i < length; i++) {
    if (length > 1 && i < length - 1) {
      comment += getRandomArrayElement(array) + ' ';
    } else {
      comment += getRandomArrayElement(array);
    }
  }
  return comment;
};

var getCommentsArray = function (array) {
  var commentsArray = [];
  commentsArray.length = getRandomInteger(1, array.length);
  for (var i = 0; i < commentsArray.length; i++) {
    commentsArray[i] = getRandomComment(array);
  }
  return commentsArray;
};

var getPhotosArray = function () {
  var array = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    array[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES + 1),
      comments: getCommentsArray(COMMENTS_ARRAY),
      description: getRandomArrayElement(DESCRIPTIONS_ARRAY)
    };
  }
  return array;
};

var renderPictures = function (array) {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture');
  var pictureFragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var pictureElement = pictureTemplate.content.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = array[i].url;
    pictureElement.querySelector('.picture__likes').textContent = array[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = array[i].comments;
    pictureFragment.appendChild(pictureElement);
  }

  pictures.appendChild(pictureFragment);
};

renderPictures(photosArray);

var renderBigPicture = function (array) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = array.url;
  bigPicture.querySelector('.likes-count').textContent = array.likes;
  bigPicture.querySelector('.comments-count').textContent = array.comments.length;

  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';

  var socialFragment = document.createDocumentFragment();

  for (var i = 0; i < array.comments.length; i++) {
    var socialCommentsInnerLi = document.createElement('li');
    socialCommentsInnerLi.className = 'social__comment';

    var socialCommentsInnerImage = document.createElement('img');
    socialCommentsInnerImage.className = 'social__picture';
    socialCommentsInnerImage.src = 'img/avatar-' + getRandomInteger(1, 7) + '.svg';
    socialCommentsInnerImage.alt = 'Аватар комментатора фотографии';
    socialCommentsInnerImage.style.width = 35;
    socialCommentsInnerImage.style.height = 35;
    socialCommentsInnerLi.appendChild(socialCommentsInnerImage);

    var socialCommentsInnerText = document.createElement('p');
    socialCommentsInnerText.className = 'social__text';
    socialCommentsInnerText.textContent = array.comments[i];
    socialCommentsInnerLi.appendChild(socialCommentsInnerText);
    socialFragment.appendChild(socialCommentsInnerLi);
  }

  socialComments.appendChild(socialFragment);

  var socialCaption = bigPicture.querySelector('.social__caption');
  socialCaption.textContent = array.description;

  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  socialCommentCount.classList.add('visually-hidden');

  var commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
};

renderBigPicture(photosArray[0]);
