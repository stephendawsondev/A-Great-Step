// only run the code when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // check if a goal already exists in LocalStorage
  checkForExistingGoal();

  // select sections and add to an array
  const sections = [...document.getElementsByTagName("section")];

  // loop through the sections and add event listeners to the buttons
  for (const [index, section] of sections.entries()) {
    if (section.id === "goal-results") {
      calculateGoalDetails();
      const exportButton = section.querySelector("#export-goal");
      exportButton.addEventListener("click", handleExportGoal);
      return;
    }

    // select the next and back buttons
    const nextButton = section.querySelector(".next");

    // using optional chaining to check if the element exists
    // before trying to select it
    const backButton = section?.querySelector(".back");

    if (!nextButton) return;
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
    // Loop through fields and update fields with goal values
    // for a better user experience
    const formFields = [...document.querySelectorAll("input")];
    for (const field of formFields) {
      const fieldName = field.name;
      const fieldValue = goal[fieldName];

      if (fieldValue) {
        field.value = fieldValue;
      }
    }
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
    // TODO - See if I want an automatic redirect or a button to click:
    // Redirect the user to the goal page
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

  if (currentSection.id === "goal-form") {
    const [isValid, error] = checkGoalRequiredFields();
    if (!isValid) {
      // display error message
      const errorElement = document.createElement("p");
      errorElement.classList.add("error");
      errorElement.style.textAlign = "right";
      errorElement.textContent = error;
      currentSection.querySelector(".form-buttons").after(errorElement);
      return;
    } else {
      // redirect the user to the goal page (not created yet)
      window.location.href = "walking-goal.html";
    }
  }
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
        if (
          !element.nextElementSibling?.classList.contains("error") &&
          !element.parentElement.parentElement.nextElementSibling?.classList.contains(
            "error"
          )
        ) {
          const errorElement = document.createElement("p");
          errorElement.classList.add("error");
          errorElement.textContent = element.validationMessage;
          if (element.type === "radio") {
            element.parentElement.parentElement.after(errorElement);
          } else {
            element.after(errorElement);
          }

          // add event listeners to the input elements to remove the error
          if (
            element.type === "text" ||
            element.type === "date" ||
            element.type === "number"
          ) {
            element.addEventListener("input", () => {
              if (element.validity.valid) {
                errorElement.remove();
              }
            });
          } else {
            element.addEventListener("change", () => {
              if (element.validity.valid) {
                errorElement.remove();
              }
            });
          }
        }
      } else {
        // check if an error message already exists
        if (
          element.type === "radio" &&
          element.parentElement.parentElement.nextElementSibling?.classList.contains(
            "error"
          )
        ) {
          const errorElement =
            element.parentElement.parentElement.nextElementSibling;
          errorElement.remove();
        } else if (element.nextElementSibling?.classList.contains("error")) {
          const errorElement = element.nextElementSibling;
          errorElement.remove();
        }
      }
    }
  }

  // check if any errors exist
  const errors = [...document.querySelectorAll(".error")];
  if (errors.length > 0) {
    containsErrors = true;
  }

  if (containsErrors) return false;
  updateGoalObject(sectionFormElements);
  return true;
};

/**
 * Updates the JSON object at each step of the form. This will
 * be used to update the goal object in LocalStorage.
 */
const updateGoalObject = (fields) => {
  // get the goal object from LocalStorage
  const goalData = localStorage.getItem("goal");
  const goal = JSON.parse(goalData);

  const updatedFields = {};
  const daysAvailable = [];
  // loop through the fields and update the goal object
  for (const field of fields) {
    if (field.type === "radio" && !field.checked) {
      continue;
    } else {
      updatedFields[field.name] = field.value;
    }

    if (field.type === "checkbox" && !field.checked) {
      continue;
    } else {
      daysAvailable.push(field.value);
      continue;
    }
  }

  // update the goal object with the new values
  const updatedGoal = { ...goal, ...updatedFields };
  updatedGoal["days-available"] = daysAvailable;

  // update the goal object in LocalStorage
  localStorage.setItem("goal", JSON.stringify(updatedGoal));
};

/**
 * Handles the "Export goal" button click. The contents are copied
 * to the clipboard and a success message is displayed.
 */
const handleExportGoal = () => {
  // get the goal object from LocalStorage
  const goalData = localStorage.getItem("goal");
  const goal = JSON.parse(goalData);

  // convert the goal object to a string
  const goalString = JSON.stringify(goal);

  // copy the string to the clipboard
  navigator.clipboard.writeText(goalString);

  // display a copied message
  const copiedMessage = document.createElement("p");
  copiedMessage.classList.add("copied");
  copiedMessage.textContent = "Goal copied to clipboard!";
  copiedMessage.setAttribute("aria-live", "polite");
  document.getElementById("export-goal").appendChild(copiedMessage);

  setTimeout(() => {
    copiedMessage.style.opacity = 0;
  }, 1500);

  // remove the copied message after 2 seconds
  setTimeout(() => {
    copiedMessage.remove();
  }, 3000);
};

/**
 * Checks the goal object in LocalStorage to ensure all required
 * fields are complete. If not, it returns an array with 'false'
 * and an error message.
 */
const checkGoalRequiredFields = () => {
  // ensure all LocalStorage required fields are complete
  const goalData = localStorage.getItem("goal");
  const goal = JSON.parse(goalData);

  if (
    !goal["first-name"] ||
    !goal["gender"] ||
    !goal["email"] ||
    !goal["age"] ||
    !goal["weight"] ||
    !goal["height"] ||
    !goal["walking-frequency"] ||
    !goal["target-weight"] ||
    !goal["target-date"]
  )
    return [
      false,
      "Some required fields are missing, please ensure to all fields out.",
    ];

  return [true, goal];
};

/**
 * Calculates the details for the users goal and
 * displays them on the goal page.
 */
const calculateGoalDetails = () => {
  const [isValid, result] = checkGoalRequiredFields();

  if (!isValid) return;

  // destructure goal object
  const {
    "first-name": firstName,
    "last-name": lastName,
    gender,
    email,
    age,
    weight,
    height,
    "walking-frequency": activityLevel,
    "days-available": daysAvailable,
    "target-weight": targetWeight,
    "target-date": goalDate,
  } = result;

  // select the elements to update
  const goalHeading = document.getElementById("goal-results-heading");
  const dateStart = document.querySelector(".date-start");
  const dateEnd = document.querySelector(".date-end");
  const daysBetween = document.querySelector(".time-remaining-days");
  const weeksBetween = document.querySelector(".time-remaining-weeks");
  const goalWeight = document.querySelector(".weight-to-lose");
  const startingStepsPerDay = document.querySelector(
    ".goal-details-text .steps-per-day"
  );
  const availableDays = document.querySelector(".available-days");
  const startingPace = document.querySelector(".goal-details-text .pace");
  const reducedStepsPerDay = document.querySelector(
    ".increase-pace .steps-per-day"
  );
  const increasedPace = document.querySelector(".increase-pace .pace");

  // days between today and goal date calculation
  const today = new Date();
  const goal = new Date(goalDate);

  const timeInDays = Math.floor((goal - today) / (1000 * 60 * 60 * 24));
  const timeInWeeks = Math.floor(timeInDays / 7);

  goalHeading.textContent = `${firstName}'s walking plan!`;
  dateStart.textContent = today.toLocaleDateString("en-GB");
  dateEnd.textContent = goal.toLocaleDateString("en-GB");
  daysBetween.textContent = `${timeInDays} days`;
  weeksBetween.textContent = `(${timeInWeeks} weeks)`;
  goalWeight.textContent = `${weight - targetWeight} kg`;
};
