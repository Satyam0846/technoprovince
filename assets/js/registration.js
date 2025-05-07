 // JavaScript to send form data to Google Apps Script
 let acces_key1 = ""; // Declare globally
 fetch("https://www.technoprovince.com/get_key.php")
     .then(response => response.json())
     .then(data => {
         acces_key1=data.key
         
     })
     .catch(error => console.error("Error fetching key:", error));

const form1 = document.getElementById('registrationForm');


form1.addEventListener('submit', async (e) => {
e.preventDefault(); // Prevent default form submission
if (!acces_key1) {
     swal("Error", "API key not loaded yet. Try again.", "error");
     return;
 }

const scriptURL1 = `https://script.google.com/macros/s/${acces_key1}`; // Replace with your Apps Script Web App URL

const formData1 = new FormData(form1);
document.getElementById('loading-overlay').style.display = 'flex';
try {
 const response = await fetch(scriptURL1, {
   method: 'POST',
   body: formData1
 });
 
 if (response.ok) {
   window.location.href = 'thank-you.html';
   // swal("Successfull", "Your messege successfully sent ", "success"); 
   form1.reset(); // Clear the form after submission
 } else {
   swal("Error,Meesage not sent");
 }
} catch (error) {
 swal("Error,Meesage not sent", error);
 console.error('Error:', error);
}
});