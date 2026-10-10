const form = document.getElementById("contactform_form");
form.addEventListener("submit", async function(event) {
  // Prevent the default browser reload page behavior
  event.preventDefault(); 
  
  // Extract values
  const emailValue = document.getElementById("email").value;
  const firstname = document.getElementById("fname").value;
  const lastname = document.getElementById("lname").value;
    
  // Basic validation logic
  if (emailValue === "") {
    alert("Please enter a valid email address!");
  } 
  else if (firstname === ""){
    alert("Please enter your first name");
  }
  else if (lastname === ""){
    alert("Please enter your last name");
  }
  else {
    console.log("Form Submitted Successfully. Data:", { email: emailValue });
    const formData = {fname: firstname, lname: lastname, email: emailValue};
    // Process your server API call here
    try{
        const response = await fetch("https://sammy1510.southeastasia.cloudapp.azure.com/api/brevo_mailer.php", 
                                     {
                                          method: "POST",
                                          headers: {
                                          "Content-Type": "application/json"
                                      },
                                      body: JSON.stringify(formData)
                                    });
        if (response.ok) {
            const data = await response.json(); // Parse incoming JSON data
            console.log("Success:", data);
            alert("Registration successful!");
        } else {
            // Handle server-side errors (e.g., 400 Bad Request, 500 Server Error)
            console.error("Server error status:", response.status);
            alert("Submission failed. Please try again.");
        }
    } catch (error){
        console.error("Network connection error:", error);
        alert("Network error. Check your internet connection.");
    }   
  }
});
