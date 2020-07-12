'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalBtnWarning = document.querySelector('.modal__btn-warning');

const replacer = (key, value) => key === 'image' ? value.name : value; // transform image file object to file name string

const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase, replacer));

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
  dataBase.push(Object.fromEntries(modalSubmitData));
  closeModal({ target: modalAdd });
  saveDB();
});