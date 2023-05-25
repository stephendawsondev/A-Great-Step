// only run the code when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // landing page dialog controls
  const dialog = document.getElementsByTagName("dialog")[0];
  const importButton = document.getElementById("import-a-goal");

  importButton.addEventListener("click", () => {
    dialog.showModal();
  });
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
const checkForExistingGoal = () => {};

/**
 * Validate the JSON input of an existing goal. If the JSON is
 * valid, it will update the goal object in LocalStorage.
 */
const validateJsonInput = () => {};

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
