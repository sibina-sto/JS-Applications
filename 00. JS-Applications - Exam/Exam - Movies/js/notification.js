const elements = {
  info: document.querySelector('#successBox'),
  error: document.querySelector('#errorBox'),
};
elements.info.addEventListener('click', hideInfo);
elements.error.addEventListener('click', hideError);

function hideInfo() {
  elements.info.parentElement.style.display = 'none';
}
function hideError() {
  elements.error.parentElement.style.display = 'none';
}

export function showInfo(message) {
  elements.info.textContent = message;
  elements.info.parentElement.style.display = 'block';
  setTimeout(hideInfo, 1000);
}
export function showError(message) {
  elements.error.textContent = message;
  elements.error.parentElement.style.display = 'block';
   setTimeout(hideInfo, 1000);
}
