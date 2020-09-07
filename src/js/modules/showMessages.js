const showMessage = msg => {
  const location = document.getElementById('location-info');
  location.textContent = msg;
};

export default showMessage;
