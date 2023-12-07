(async() => {
  fetch('http://192.168.1.213:3000/form/submit', {
    method: 'GET'
  })
  .then((response) => response.text())
  .then((response) => console.log(response))
  .catch(error => console.log(error));
})();