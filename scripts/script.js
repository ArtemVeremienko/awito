'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalBtnWarning = document.querySelector('.modal__btn-warning');

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeEscModal);
});

modalAdd.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.modal__close') ||
    target === modalAdd) {
    modalAdd.classList.add('hide');
    modalSubmit.reset();
    document.removeEventListener('keydown', closeEscModal);
  }
});

const closeEscModal = evt => {
  if (evt.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeEscModal);
  }
}

const showModalItem = evt => {
  modalItem.classList.remove('hide');
  document.body.style.overflow = 'hidden';
};

const hideModalItem = evt => {
  modalItem.classList.add('hide');
  document.body.style.overflow = '';
};

catalog.addEventListener('click', event => {
  const target = event.target.closest('.card');

  if (!target) return;

  showModalItem();
  document.addEventListener('keydown', closeEscModal);
});

modalItem.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.modal__close') || target === modalItem) {
    hideModalItem();
    document.removeEventListener('keydown', closeEscModal);
  }
});

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
  console.log(...modalSubmitData);
  dataBase.push(modalSubmitData);
  console.log(dataBase);
  modalSubmit.reset();
});