'use strict';

const MAX_FILESIZE = 200 * 1024; // Bytes to Kb

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalBtnWarning = document.querySelector('.modal__btn-warning'),
  modalFileInput = document.querySelector('.modal__file-input'),
  modalFileBtn = document.querySelector('.modal__file-btn'),
  modalImageAdd = document.querySelector('.modal__image-add');

const defaultBtnText = modalFileBtn.textContent;
const defaultImageSrc = modalImageAdd.src;
const infoPhoto = {};

const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

const showModalItem = event => {
  modalItem.classList.remove('hide');
  document.body.style.overflow = 'hidden';
};

const closeModal = event => {
  const target = event.target;

  if (target.closest('.modal__close') ||
    target.classList.contains('modal') ||
    event.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', closeModal);
    if (target.closest('.modal__add')) {
      modalSubmit.reset();
      modalImageAdd.src = defaultImageSrc;
      modalFileBtn.textContent = defaultBtnText;
      checkForm();
    };
  }
};

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeModal);
});

modalAdd.addEventListener('click', closeModal);

catalog.addEventListener('click', event => {
  const target = event.target.closest('.card');

  if (!target) return;

  showModalItem();
  document.addEventListener('keydown', closeModal);
});

modalItem.addEventListener('click', closeModal);

// Form handlers

const checkForm = event => {
  const isValidForm = [...modalSubmit.elements].filter(elem => elem.type !== 'submit').every(elem => elem.value);

  modalBtnSubmit.disabled = !isValidForm;

  isValidForm ? modalBtnWarning.style.display = 'none' : modalBtnWarning.style.display = '';
};

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const modalSubmitData = new FormData(modalSubmit);
  modalSubmitData.set('image', infoPhoto.base64);
  dataBase.push(Object.fromEntries(modalSubmitData));
  closeModal({ target: modalAdd });
  saveDB();
});

modalFileInput.addEventListener('change', event => {
  const target = event.target;
  const reader = new FileReader();
  const file = target.files[0];

  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener('load', event => {
    if (infoPhoto.size < MAX_FILESIZE) {
      modalFileBtn.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = `Файл не должен превышать ${MAX_FILESIZE / 1024}Кб`;
    }

  });
});