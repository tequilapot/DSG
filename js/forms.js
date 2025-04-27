/**
 * DSG Marketing Website - HubSpot Form Integration
 * This file handles the integration with HubSpot forms
 */

// HubSpot configuration
const hubspotConfig = {
  portalId: "242636499",
  formId: "d37a5d05-940b-45b8-9653-43a9e0980213",
  region: "na2"
};

// Initialize HubSpot forms when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Load the HubSpot forms script
  loadHubSpotFormsScript();
  
  // Set up contact form submission handling
  setupContactForm();
});

/**
 * Loads the HubSpot forms script dynamically
 */
function loadHubSpotFormsScript() {
  const script = document.createElement('script');
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  script.src = '//js-na2.hsforms.net/forms/embed/v2.js';
  script.async = true;
  script.onload = function() {
    console.log('HubSpot Forms script loaded successfully');
    // Initialize any embedded forms if needed
    initializeEmbeddedForms();
  };
  document.head.appendChild(script);
}

/**
 * Initializes embedded HubSpot forms on the page
 */
function initializeEmbeddedForms() {
  // Check if there are any form containers on the page
  const formContainers = document.querySelectorAll('.hubspot-form-container');
  
  if (formContainers.length > 0) {
    formContainers.forEach(container => {
      // Create the HubSpot form in the container
      if (typeof hbspt !== 'undefined') {
        hbspt.forms.create({
          portalId: hubspotConfig.portalId,
          formId: hubspotConfig.formId,
          region: hubspotConfig.region,
          target: '#' + container.id
        });
      }
    });
  }
}

/**
 * Sets up the contact form to submit to HubSpot
 */
function setupContactForm() {
  // Find the contact form if it exists
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = {};
      
      // Convert FormData to object
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Submit to HubSpot
      submitToHubSpot(formDataObj);
    });
  }
}

/**
 * Submits form data to HubSpot via the API
 * @param {Object} data - The form data to submit
 */
function submitToHubSpot(data) {
  console.log('Submitting to HubSpot:', data);
  
  // Create the submission URL
  const submissionUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotConfig.portalId}/${hubspotConfig.formId}`;
  console.log('Submission URL:', submissionUrl);
  
  // Prepare the data for HubSpot
  const hubspotData = {
    fields: Object.keys(data).map(key => ({
      name: key,
      value: data[key]
    })),
    context: {
      pageUri: window.location.href,
      pageName: document.title
    }
  };
  
  console.log('HubSpot data payload:', hubspotData);
  
  // Submit the data
  fetch(submissionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(hubspotData)
  })
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(result => {
    console.log('Success:', result);
    // Show success message
    showFormMessage('Thank you for your submission! We will get back to you soon.', 'success');
    // Reset the form
    document.getElementById('contact-form').reset();
  })
  .catch(error => {
    console.error('Error details:', error);
    // Show error message
    showFormMessage('There was an error submitting your form. Please try again later.', 'error');
  });
}

/**
 * Displays a message after form submission
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success/error)
 */
function showFormMessage(message, type) {
  // Find or create message element
  let messageEl = document.getElementById('form-message');
  
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.id = 'form-message';
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);
  }
  
  // Set message content and style
  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;
  
  // Hide message after 5 seconds
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 5000);
}