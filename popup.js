const ratingButtons = document.querySelectorAll('.rating-button');
let selectedRating = null;

ratingButtons.forEach(button => {
  button.addEventListener('click', () => {
    ratingButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedRating = button.getAttribute('data-rating');

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
  const radioButtons = document.querySelectorAll(`.rdbOpinion input[type="radio"][value="${rating}"]`);

  radioButtons.forEach(radioButton => {
    radioButton.checked = true;
  });

}

function automateSurvey(rating) {

  const radioButtons = document.querySelectorAll(`.rdbOpinion input[type="radio"][value="${rating}"]`);

  radioButtons.forEach(radioButton => {
    radioButton.checked = true;
  });

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
