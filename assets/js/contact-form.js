 // JavaScript to send form data to Google Apps Script
 let acces_key = ""; // Declare globally
 fetch("https://www.technoprovince.com/get_key.php")
     .then(response => response.json())
     .then(data => {
         acces_key=data.key
         
     })
     .catch(error => console.error("Error fetching key:", error));

const form = document.getElementById('contactForm');


form.addEventListener('submit', async (e) => {
e.preventDefault(); // Prevent default form submission
if (!acces_key) {
     swal("Error", "API key not loaded yet. Try again.", "error");
     return;
 }

const scriptURL = `https://script.google.com/macros/s/${acces_key}`; // Replace with your Apps Script Web App URL

const formData = new FormData(form);
document.getElementById('loading-overlay').style.display = 'flex';
try {
 const response = await fetch(scriptURL, {
   method: 'POST',
   body: formData
 });
 
 if (response.ok) {
   window.location.href = 'thank-you.html';
   // swal("Successfull", "Your messege successfully sent ", "success"); 
   form.reset(); // Clear the form after submission
 } else {
   swal("Error,Meesage not sent");
 }
} catch (error) {
 swal("Error,Meesage not sent", error);
 console.error('Error:', error);
}
});