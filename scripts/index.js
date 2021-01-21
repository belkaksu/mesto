let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.overlay');
let closePopup = document.querySelector('.popup__close-button');

let togglePopup = function() {

  popup.classList.toggle('overlay_display_active');
}

openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);


popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget)
  togglePopup();
})


