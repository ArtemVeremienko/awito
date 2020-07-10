'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalBtnWarning = document.querySelector('.modal__btn-warning');

const closeEscModal = event => {
  if (event.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    modalSubmit.reset();
    document.removeEventListener('keydown', closeEscModal);
  }
}

const showModalItem = event => {
  modalItem.classList.remove('hide');
  document.body.style.overflow = 'hidden';
};

const hideModalItem = target => {
  target.closest('.modal').classList.add('hide');
  document.body.style.overflow = '';
};

const closeModal = event => {
  const target = event.target;

  if (target.closest('.modal__close') || target.classList.contains('modal')) {
    hideModalItem(target);
    document.removeEventListener('keydown', closeEscModal);
    if (target.closest('.modal__add')) modalSubmit.reset();
  }
};

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeEscModal);
});

modalAdd.addEventListener('click', closeModal);

catalog.addEventListener('click', event => {
  const target = event.target.closest('.card');

  if (!target) return;

  showModalItem();
  document.addEventListener('keydown', closeEscModal);
});

modalItem.addEventListener('click', closeModal);

// Form handlers

modalSubmit.addEventListener('input', () => {
  const isValidForm = [...modalSubmit.elements].filter(elem => elem.type !== 'submit').every(elem => elem.value);

  const defaultText = modalBtnWarning.textContent;

  if (isValidForm) {
    modalBtnSubmit.disabled = !isValidForm;
    modalBtnWarning.style.display = 'none';
  } else {
    modalBtnWarning.style.display = '';
  }
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const modalSubmitData = new FormData(modalSubmit);
  dataBase.push(modalSubmitData);
  modalSubmit.reset();
});