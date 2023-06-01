// only run the code when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // check if a goal already exists in LocalStorage
  checkForExistingGoal();

  // select sections and add to an array
  const sections = [...document.getElementsByTagName("section")];

  // loop through the sections and add event listeners to the buttons
  for (const [index, section] of sections.entries()) {
    // select the next and back buttons
    const nextButton = section.querySelector(".next");

    // using optional chaining to check if the element exists
    // before trying to select it
    const backButton = section?.querySelector(".back");

    // add event listeners to the buttons
    nextButton.addEventListener("click", (event) => {
      handleNextButtonClick(event, index);
    });
    if (backButton) {
      backButton.addEventListener("click", (event) => {
        handleBackButtonClick(event, index);
      });
    }
  }

  // landing page dialog controls
  const dialog = document.getElementsByTagName("dialog")[0];
  const importButton = document.getElementById("import-a-goal");

  importButton.addEventListener("click", () => {
    dialog.showModal();
  });

  const importForm = document.getElementById("import-form");
  importForm.addEventListener("submit", handleImportSubmit);
});

/**
 * Checks LocalStorage for a goal object. If it exists and all
 * fields are complete, it will redirect the user to the goal
 * page. If it exists and not all fields are complete, it will
 * update the form with the data from LocalStorage.
 *
 * If it doesn't exist, it will create a new goal object in
 * LocalStorage.
 */
const checkForExistingGoal = () => {
  // Check if goal exists in LocalStorage
  const goalData = localStorage.getItem("goal");
  if (goalData) {
    const goal = JSON.parse(goalData);
    console.log(goal);
  } else {
    // Goal doesn't exist yet, create an empty array in LocalStorage
    localStorage.setItem("goal", JSON.stringify({}));
  }
};

/**
 * Handles the submission of the import form. It will check
 * the JSON input and update the goal object in LocalStorage.
 */
const handleImportSubmit = (event) => {
  const importTextarea = document.querySelector("#import-form textarea");
  const textareaValue = importTextarea.value.trim();

  if (!textareaValue) return;
  // detructure object with error and isValid properties
  const { isValid, error } = validateJsonInput(textareaValue);

  if (isValid) {
    // Update the goal object in LocalStorage
    const goal = JSON.parse(textareaValue);
    localStorage.setItem("goal", JSON.stringify(goal));
    // Redirect the user to the goal page (not created yet)
    // window.location.href = "goal.html";

    // Clear the textarea after submission
    importTextarea.value = "";

    // clear errors
    const errorElement = document?.querySelector(".error");
    if (errorElement) errorElement.remove();
  } else {
    event.preventDefault();
    // display error message above text area
    if (document.querySelector(".error")) return;
    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent =
      'The JSON you entered is invalid. JSON should be formatted like this: {"key": "value"}.';

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement resource
    // used
    importTextarea.insertAdjacentElement("beforebegin", errorElement);

    // log the error to the console
    console.error(error);
  }
};

/**
 * Validate the JSON input of an existing goal. If the JSON is
 * valid, it will update the goal object in LocalStorage.
 */
const validateJsonInput = (inputText) => {
  try {
    JSON.parse(inputText);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

/**
 * Handles the 'next' button click. Clicking next will update
 * the object in LocalStorage and move the user on.
 */
const handleNextButtonClick = (event, currentSectionIndex) => {
  // prevent the default behaviour of the button
  event.preventDefault();

  // validate the form inputs
  const fieldsValid = handleFormValidation(currentSectionIndex);

  if (!fieldsValid) return;

  const currentSection =
    document.getElementsByTagName("section")[currentSectionIndex];

  if (currentSection.id === "goal-form") return;

  // scroll to the next section
  const nextSection =
    document.getElementsByTagName("section")[currentSectionIndex + 1];

  nextSection.scrollIntoView();
};

/**
 * Handles the 'back' button click. Clicking back will update
 * the object in LocalStorage and move the user back.
 */
const handleBackButtonClick = (event, currentSectionIndex) => {
  // prevent the default behaviour of the button
  event.preventDefault();

  // scroll to the previous section
  const previousSection =
    document.getElementsByTagName("section")[currentSectionIndex - 1];

  previousSection.scrollIntoView();
};

/**
 * Handles the validation of the form inputs - text, date, number,
 * radio buttons, checkboxes, etc. It should be run before updating
 * the object in LocalStorage.
 */
const handleFormValidation = (currentSectionIndex) => {
  // select the current section
  const currentSection =
    document.getElementsByTagName("section")[currentSectionIndex];

  if (currentSection.id === "landing-page") return true;

  // select form elements in the current section
  const sectionFormElements = [...currentSection.querySelectorAll("input")];

  let containsErrors = false;
  // loop through the form elements and validate them
  for (const element of sectionFormElements) {
    // check if the input is required
    if (element.required) {
      // check if the input is valid using
      // the method here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
      if (!element.validity.valid) {
        // check if an error message already exists
        if (!element.nextSibling.classList.contains("error")) {
          const errorElement = document.createElement("p");
          errorElement.classList.add("error");
          errorElement.textContent = element.validationMessage;
          element.after(errorElement);
          containsErrors = true;
        }
      }
    }
  }
  if (containsErrors) return false;
  return true;
};

/**
 * Handles the final submission of the form. This updates the goal
 * in LocalStorage and redirects the user to the goal page.
 */
const handleFinalSubmit = () => {};
