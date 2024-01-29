const button = document.getElementById("btn");

button.onclick = () => {
  location.href = "./fifth.html";
};
  const nickname = localStorage.getItem('nickname');
  const welcomeHeading = document.querySelector('.fourth-page h3');
  
  if (nickname) {
      welcomeHeading.textContent = nickname;
  } else {
      welcomeHeading.textContent = "Welcome to Hogwarts!";
      alert('Nickname not found in localStorage');
  }

