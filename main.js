(async() => {
  const IP = '192.168.1.213'; // to-do: change the ip address based on the machine
  fetch(`http://${IP}:3000/form/submit`, {
    method: 'GET'
  })
  .then((response) => response.text())
  .then((response) => console.log(response))
  .catch(error => console.log(error));
})();