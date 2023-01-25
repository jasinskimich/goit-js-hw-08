import _ from 'lodash';

const form = document.querySelector('.feedback-form');

const saveInput = e => {
  window.localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      message: form.message.value,
      email: form.email.value,
    })
  );
};

const loadInput = e => {
  let loadedData = window.localStorage.getItem('feedback-form-state');
  try {
    loadedData = JSON.parse(loadedData);
  } catch {
    loadedData = { email: '', message: '' };
  }
  form.email.value = loadedData ? loadedData.email ?? '' : '';
  form.message.value = loadedData ? loadedData.message ?? '' : '';
};

const overrideSubmit = e => {
  e.preventDefault();
  console.log(e.target.email.value, ' left feedback: ', e.target.message.value);
  e.target.message.value = '';
  e.target.email.value = '';
  window.localStorage.removeItem('feedback-form-state');
};

form.addEventListener('input', _.throttle(saveInput, 500));
window.addEventListener('load', loadInput);
form.addEventListener('submit', overrideSubmit);
