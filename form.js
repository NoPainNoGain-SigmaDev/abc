
//About Us Form

const aboutUsForm = document.getElementById("about-us-form");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const feedback = document.getElementById("contact-feedback");
const customOrder =document.getElementById("contact-custom-order");
const textArea = document.getElementById("contact-content");

const saveInLocalStorage = (obj)=>{
  localStorage.setItem("contactForm",JSON.stringify(obj));
};

const parseObject = (name, email, reason, text) =>{
  return  {
    "Name":name,
    "Email":email,
    "Reason": reason,
    "Text": text
  };
}

aboutUsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  saveInLocalStorage(parseObject(
    contactName.value, 
    contactEmail.value,  
    feedback.checked?"feedback":"custom-order",
    textArea.value
  ));
  

  setAlertMessage(" Thanks for your message! We'll get back to you soon 📨");
  alertWindow.classList.toggle("hidden");
}); 