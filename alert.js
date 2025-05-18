//Alerts

const alertWindow = document.getElementById("alert");
const alertText = document.getElementById("alert-text");
const closeAlertBtn = document.getElementById("close-alert-btn");
const newsForm = document.getElementById("newsletter-form");

//Sets the alert message
const setAlertMessage = (alertMsg) => {
  alertText.textContent = alertMsg;
};

//closes the alert window
closeAlertBtn.addEventListener("click", () => {
  alertWindow.classList.toggle("hidden");
});

//Makes the alert window for newsletter visible and sets the new message
newsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  setAlertMessage("Thanks for joining — your inbox just got stronger 💪");
  alertWindow.classList.toggle("hidden");
});


