"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navSubmit.show();
  $navFavorites.show();

}

/** Show submit form on click on "submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  evt.preventDefault();
  $submitForm.show();
}

$navSubmit.on("click", navSubmitClick);

/** Shows favorites page on favorites nav click. */

function navFavoriteClick(evt) {
  console.debug("navFavorite", evt);
  evt.preventDefault();


  hidePageComponents();
  putFavoritesOnPage();
  $(".favorites-container").show();
  $favoritesList.show();

}

$navFavorites.on('click', navFavoriteClick);