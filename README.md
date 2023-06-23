# Resources

- https://fontjoy.com/ (Font pairing)
- https://fonts.google.com/ (Google Fonts)
- https://coolors.co/ (Color palette)
- https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type (Scroll snap instructions)
- https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement (MDN Documentation on insertAdjacentElement)
- https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#validating_forms_using_javascript (MDN Documentation on form validation)
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity (MDN Documentation on validity)
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live (MDN Documentation on aria-live)
- https://pubmed.ncbi.nlm.nih.gov/15570150/ (Formula for calories burned from walking)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow (MDN Documentation on Math.pow)

## Tuts

- https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/ (Article on adding accessible SVGs)
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog (MDN Documentation on the dialog element for popup)
- https://draft.dev/learn/github-pages-404 (Adding a 404 to GitHub Pages)
- https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns (Information on Docstring commands)
- https://haydar-ai.medium.com/learning-how-to-git-creating-a-longer-commit-message-16ca32746c3a (How to write a good commit message for longer commands)

## Images

<a href="https://storyset.com/">Illustrations by Storyset</a>
<a href="https://www.svgrepo.com/svg/510907/chevron-left-md">Left chevron from SVG Repo</a>
<a href="https://www.svgrepo.com/svg/510910/chevron-right-md">Right chevron from SVG Repo</a>

<!-- Reminders -->

1. Add aria-labels to back and next buttons
2. When doing the final validation, the error message is vague. I need to update it so that the missing fields are output.

## Bugs

1. As sections have a 100vh height, the sections beneath it were overlapping - I needed to make the min-height 100vh instead. However, that caused the snap effect to break on mobile. Still working on a fix for this.
2. When importing a goal, if there is already an error message displayed and invalid json is entered, another error message is added.
3. When clicking the "next" or "previous" buttons, I was getting a 405 error. I had to prevent the default form submission behaviour to fix this.
4. When removing radio button error, it only gets removed if the user clicks the first option. If they click another option, the error remains. I will try to fix this by adding a for loop to check all radio buttons.
5. When updating form fields in local stoage, the last radio button is always selected. Also, all checkbox values are added. I think I will add a "checked" property so that only those that are checked are added. For the radio buttons, I will add a "selected" property.
6. For the final validation, returning false and the error message appears to be disabling the ability to update the object in Local Storage. It shouldn't really be an issue since the user should not be able to get to that step without fixing the errors along the way. If I have time, I will come back and try to apply a fix.
7. When a user clicks "back" on a section and if there is an error on the section they are clicking from, it prevents the next button of the section they are now on from working.
