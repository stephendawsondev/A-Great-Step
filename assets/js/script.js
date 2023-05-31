// only run the code when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // check if a goal already exists in LocalStorage
  checkForExistingGoal();

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
  } else {
    event.preventDefault();
    // display error message above text area
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
const handleNextButtonClick = () => {};

/**
 * Handles the 'back' button click. Clicking back will update
 * the object in LocalStorage and move the user back.
 */
const handleBackButtonClick = () => {};

/**
 * Handles the validation of the form inputs - text, date, number,
 * radio buttons, checkboxes, etc. It should be run before updating
 * the object in LocalStorage.
 */
const handleFormValidation = () => {};

/**
 * Handles the final submission of the form. This updates the goal
 * in LocalStorage and redirects the user to the goal page.
 */
const handleSubmit = () => {};
