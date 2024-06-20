const ratingButtons = document.querySelectorAll('.rating-button');
let selectedRating = null;

ratingButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    ratingButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to the clicked button
    button.classList.add('active');
    // Set the selected rating
    selectedRating = button.getAttribute('data-rating');

    // Preview the rating in the form
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: previewRating,
        args: [selectedRating]
      });
    });
  });
});

document.getElementById('start-automation').addEventListener('click', () => {
  if (selectedRating) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: automateSurvey,
        args: [selectedRating]
      });
    });
  } else {
    alert('Please select your poison before submitting.');
  }
});

function previewRating(rating) {
  // Select all radio buttons with the chosen rating value
  const radioButtons = document.querySelectorAll(`.rdbOpinion input[type="radio"][value="${rating}"]`);

  // Iterate through each radio button and select them
  radioButtons.forEach(radioButton => {
    radioButton.checked = true;
  });

}

function automateSurvey(rating) {
  // Select all radio buttons with the chosen rating value
  const radioButtons = document.querySelectorAll(`.rdbOpinion input[type="radio"][value="${rating}"]`);

  // Iterate through each radio button and select them
  radioButtons.forEach(radioButton => {
    radioButton.checked = true;
  });

  // Submit the form after selecting the radio buttons
  // Replace '#ctl00_MainContainer_btnTheorySubmit' with the appropriate submit button selector
  let submitButton = document.querySelector('#ctl00_MainContainer_btnTheorySubmit');
  if (!submitButton) {
    submitButton = document.querySelector('#ctl00_MainContainer_btnLabSubmit');
  }
  if (submitButton) {
    submitButton.click();
  } else {
    alert('Submit button not found!');
  }
}
