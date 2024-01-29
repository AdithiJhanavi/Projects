document.getElementById('btn').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const nickname = document.getElementById('nickname').value;
    if (name && nickname) {
        localStorage.setItem('name', name);
        localStorage.setItem('nickname', nickname);
        window.location.href = "third.html"; 
    } else {
        alert('Invalid Input');
    }
  });