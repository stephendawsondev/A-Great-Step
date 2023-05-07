// only run the code when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // landing page dialog controls
  const dialog = document.getElementsByTagName("dialog")[0];
  const importButton = document.getElementById("import-a-goal");

  importButton.addEventListener("click", () => {
    dialog.showModal();
  });
});
