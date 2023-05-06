document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementsByTagName("dialog")[0];
  const importButton = document.getElementById("import-a-goal");

  importButton.addEventListener("click", () => {
    dialog.showModal();
  });
});
