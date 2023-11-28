const userStoreBtn = document.querySelector("#user");
const userStoreInfo = document.querySelector(".user-section .store .user-info");
const allUserMenuItem = document.querySelectorAll('[role="user-item"]');

const notificationMenu = document.querySelector(".user-section .notification-info");
const notificationBell = document.querySelector(".user-section .notification");
const allNotificationItem = notificationMenu.querySelectorAll('[role="notification-item"]');

// User store toggle event
userStoreBtn.addEventListener("click", toggleStore);

function toggleStore() {
    const isExpanded = userStoreBtn.attributes["aria-expanded"].value === "true";

    userStoreInfo.classList.toggle("show");

    // Remove class of show from notification menu
    if (notificationMenu.classList.contains("show")) {
        notificationMenu.classList.remove("show");
    }

    if (isExpanded) {
        closeStoreMenu();
    } else {
        openStoreMenu();
    }
}

function handleStoreEscapeKeyPress(event) {
    if (event.key == "Escape") {
        toggleStore();
    }
}

function handleStoreItemArrowKeyPress(event, menuItemIndex) {
    let nextUserMenuItem = allUserMenuItem.item((menuItemIndex + 1) % allUserMenuItem.length),
        prevUserMenuItem = allUserMenuItem.item((menuItemIndex - 1) % allUserMenuItem.length);

    if (event.key == "ArrowRight" || event.key == "ArrowDown") {
        nextUserMenuItem.focus();
    }

    if (event.key == "ArrowUp" || event.key == "ArrowLeft") {
        if (menuItemIndex == 0 || prevUserMenuItem <= 0) {
            prevUserMenuItem = allUserMenuItem.item(allUserMenuItem.length - 1);

            prevUserMenuItem.focus();
            return;
        }
        prevUserMenuItem.focus();
    }
}

function openStoreMenu() {
    userStoreBtn.ariaExpanded = "true";
    allUserMenuItem.item(0).focus();

    userStoreInfo.addEventListener("keyup", handleStoreEscapeKeyPress);

    allUserMenuItem.forEach((userMenuItem, index) => {
        userMenuItem.addEventListener("keyup", () => handleStoreItemArrowKeyPress(event, index));
    });
}

function closeStoreMenu() {
    userStoreBtn.ariaExpanded = "false";
    userStoreBtn.focus();
}

// Notification toggle Event
notificationBell.addEventListener("click", toggleNotification);

function toggleNotification() {
    const isExpanded = notificationBell.attributes["aria-expanded"].value === "true";

    notificationMenu.classList.toggle("show");

    // Remove class of show from user store menu
    if (userStoreInfo.classList.contains("show")) {
        userStoreInfo.classList.remove("show");
    }

    if (isExpanded) {
        closeNotificationMenu();
    } else {
        openNotificationMenu();
    }
}

function handleEscapeKeyPress(event) {
    if (event.key === "Escape") {
        toggleNotification();
    }
}

function handleNotificationItemArrowKeyPress(event, notificationItemIndex) {
    const isLastItem = notificationItemIndex === allNotificationItem.length - 1;
    const isFirstItem = notificationItemIndex === 0;

    const nextNotificationItem = allNotificationItem.item(notificationItemIndex + 1);
    const prevNotificationItem = allNotificationItem.item(notificationItemIndex - 1);

    if (event.key == "ArrowRight" || event.key == "ArrowDown") {
        if (isLastItem) {
            allNotificationItem.item(0).focus();
            return;
        }
        nextNotificationItem.focus();
    }

    if (event.key == "ArrowLeft" || event.key == "ArrowUp") {
        if (isFirstItem) {
            allNotificationItem.item(allNotificationItem.length - 1).focus();

            return;
        }
        prevNotificationItem.focus();
    }
}

function openNotificationMenu() {
    notificationBell.ariaExpanded = "true";
    allNotificationItem.item(0).focus();

    notificationMenu.addEventListener("keyup", handleEscapeKeyPress);

    allNotificationItem.forEach((notificationItem, index) => {
        notificationItem.addEventListener("keyup", () =>
            handleNotificationItemArrowKeyPress(event, index)
        );
    });
}

function closeNotificationMenu() {
    notificationBell.ariaExpanded = "false";
    notificationBell.focus();
}

// Plan notification close
const planCloseBtn = document.querySelector("#plan .close-btn");
const plan = document.querySelector("#plan");

planCloseBtn.addEventListener("click", () => {
    plan.classList.add("hide");
});

// Showing setup options
const setupTogglerBtn = document.querySelector(".setup__header-toggle #toggle-btn"),
    setupBody = document.querySelector("#setup__body");

setupTogglerBtn.addEventListener("click", toggleSetup);

function toggleSetup() {
    const isExpanded = setupTogglerBtn.attributes["aria-expanded"].value === "true";

    if (isExpanded) {
        closeSetup();
    } else {
        openSetup();
    }
}

function openSetup() {
    setupTogglerBtn.ariaExpanded = "true";
    setupBody.ariaHidden = "false";

    setupBody.classList.remove("hide");
    setupTogglerBtn.classList.remove("rotate");
}

function closeSetup() {
    setupTogglerBtn.ariaExpanded = "false";
    setupBody.ariaHidden = "true";

    setupBody.classList.add("hide");
    setupTogglerBtn.classList.add("rotate");
}

// Display Setup options
const setupItemsOptions = document.querySelectorAll(".setup__item"),
    setupItemsTogglers = document.querySelectorAll(".setup__item-header");

setupItemsTogglers.forEach((setupItemToggler) => {
    setupItemToggler.addEventListener("click", () => toggleSetupItem(setupItemToggler));
});

function toggleSetupItem(element) {
    const currentSetupItem = element.parentElement;

    // remove the class of show from other setup items options
    setupItemsOptions.forEach((setupItem) => setupItem.classList.remove("show"));

    currentSetupItem.classList.toggle("show");
}

// Display setup check animation and display completed value
let checkedCount = 0;
const checkedCountDisplay = document.querySelector(".completed-value");
const setupProgress = document.querySelector(".progress-indicator");

const MARK_AS_DONE_CLASS = "checked";
const HIDDEN_CLASS = "hidden";

// Function to update count display
function updateCheckedCount() {
    checkedCount = document.querySelectorAll(`.option_checker.${MARK_AS_DONE_CLASS}`).length;

    checkedCountDisplay.textContent = checkedCount;
    setupProgress.style.width = `${(checkedCount / 5) * 100}%`;
}

// Function to check if option checker is marked as done
function handleMarkAsDone(el) {
    const notCompletedIcon = el.querySelector(".not-checked-icon"),
        loadingSpinnerIcon = el.querySelector(".check-loading-icon"),
        completedIcon = el.querySelector(".checked-icon"),
        optionCheckStatus = el.parentElement.querySelector(".option_check_status");

    notCompletedIcon.classList.add(HIDDEN_CLASS);
    loadingSpinnerIcon.classList.remove(HIDDEN_CLASS);

    optionCheckStatus.textContent = "Loading, please wait!";

    setTimeout(() => {
        loadingSpinnerIcon.classList.add(HIDDEN_CLASS);
        completedIcon.classList.remove(HIDDEN_CLASS);

        el.ariaLabel = el.ariaLabel.replace("as done", "as not done");

        optionCheckStatus.textContent = "Successfully marked as done";

        el.classList.add(MARK_AS_DONE_CLASS);
        updateCheckedCount();
        focusNextButton();
    }, 2000);
}

// Function to check if option checker is marked as not done
function handleMarkAsNotDone(el) {
    const notCompletedIcon = el.querySelector(".not-checked-icon"),
        loadingSpinnerIcon = el.querySelector(".check-loading-icon"),
        completedIcon = el.querySelector(".checked-icon"),
        optionCheckStatus = el.parentElement.querySelector(".option_check_status");

    optionCheckStatus.textContent = "Loading, please wait!";

    completedIcon.classList.add(HIDDEN_CLASS);
    loadingSpinnerIcon.classList.remove(HIDDEN_CLASS);

    setTimeout(() => {
        loadingSpinnerIcon.classList.add(HIDDEN_CLASS);
        notCompletedIcon.classList.remove(HIDDEN_CLASS);

        el.ariaLabel = el.ariaLabel.replace("as not done", "as done");

        optionCheckStatus.textContent = "Successfully marked as not done";

        el.classList.remove(MARK_AS_DONE_CLASS);
        updateCheckedCount();
    }, 2000);
}

// Function to check if option checker is marked as done or not done
function handleMarkAsDoneOrNotDone(checker) {
    const markedAsDone = checker.classList.contains(MARK_AS_DONE_CLASS);

    if (markedAsDone) {
        handleMarkAsNotDone(checker);
    } else {
        handleMarkAsDone(checker);
    }
}

// Select all option checker and add animation to the clicked one
const option_checkers = document.querySelectorAll(".option_checker");

option_checkers.forEach(function (option_check) {
    option_check.addEventListener("click", function () {
        handleMarkAsDoneOrNotDone(this);
    });
});

// Function to move focus to the next option checker button
function focusNextButton() {
    let nextButton = null;
    option_checkers.forEach(function (option_check) {
        if (!option_check.classList.contains(MARK_AS_DONE_CLASS)) {
            if (!nextButton) {
                nextButton = option_check;
            }
        }
    });

    if (nextButton) {
        nextButton.focus();

        const nextButtonParent = nextButton.parentElement;

        toggleSetupItem(nextButtonParent);
    }
}
