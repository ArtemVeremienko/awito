'use strict';

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item');

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeEscModalAdd);
});

modalAdd.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.modal__close') ||
    target === modalAdd) {
    modalAdd.classList.add('hide');
    modalSubmit.reset();
    document.removeEventListener('keydown', closeEscModalAdd);
  }
});

const closeEscModalAdd = evt => {
  if (evt.code === 'Escape') {
    modalAdd.classList.add('hide');
    document.removeEventListener('keydown', closeEscModalAdd);
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

const closeEscModalItem = evt => {
  if (evt.code === 'Escape') {
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeEscModalItem);
  }
};

catalog.addEventListener('click', event => {
  const target = event.target.closest('.card');

  if (!target) return;

  showModalItem();
  document.addEventListener('keydown', closeEscModalItem);
});

modalItem.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.modal__close') || target === modalItem) {
    hideModalItem();
    document.removeEventListener('keydown', closeEscModalItem);
  }
});