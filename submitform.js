document.getElementById('contactForm').addEventListener('submit', async (event) => {
    // Prevent the standard HTML browser reload or redirect
    event.preventDefault(); 

    const statusDiv = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    // UI Feedback: Show loading state
    statusDiv.style.color = "blue";
    statusDiv.innerText = "Sending your email...";
    submitBtn.disabled = true;

    // Automatically package all inputs (fname, lname, email) based on their "name" attributes
    const formData = new FormData(event.target);

    try {
        // Send data directly to your functional Azure VM endpoint
        const response = await fetch('http://20.212.20', {
            method: 'POST',
            body: formData
        });
      // Parse the JSON response coming from Brevo via your PHP script
        const result = await response.json();

        if (response.ok) {
            // Success! (HTTP Status 200)
            statusDiv.style.color = "green";
            statusDiv.innerText = "Success! Your form has been submitted and email sent. 🎉";
            event.target.reset(); // Clear the form fields
        } else {
            // Server error returned from your PHP/Brevo engine (e.g. 400 or 401)
            statusDiv.style.color = "red";
            statusDiv.innerText = `Server Error: ${result.message || 'Submission failed.'}`;
        }
    } catch (error) {
        // Catch network level errors (e.g., VM is down or blocked by browser Mixed Content rules)
        console.error("Network Error Details:", error);
        statusDiv.style.color = "red";
        statusDiv.innerText = "Failed to connect to the email server. Please check your connection.";
    } finally {// Re-enable the button after the processing finishes
        submitBtn.disabled = false;
    }
});
