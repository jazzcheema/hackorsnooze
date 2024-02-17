"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

//TODO: logic to determine if markup should be favorited or not, use currentUser.favorites array

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="favorite-star hidden"><i class="bi bi-star"></i></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  if (currentUser) $('.favorite-star').show();
}

/** Upon click of the nav submit button, grabs new story submit form inputs,
 * creates an instance of Story and adds article to the DOM.
 */
async function postNewStoryOnSubmit(evt) {
  evt.preventDefault();

  const author = $('#author').val();
  const title = $('#title').val();
  const url = $('#url').val();

  const storyInputs = { author, title, url };
  const newStory = await storyList.addStory(currentUser, storyInputs);

  const $storyMarkUp = generateStoryMarkup(newStory);
  $allStoriesList.prepend($storyMarkUp);

  $submitForm.hide();
}

$submitButton.on('click', postNewStoryOnSubmit);

//TODO: use await when calling an async function (line 83, 91) IF you want return value from async function you must await
//TODO: should consolidate remove favorite funciton to work no matter where it is clicked

/** on click of favorite star--> change to filled-in star */
function addStoryToFavoriteOnClick(evt) {
  const storyId = $(evt.target).closest('li').attr("id");
  if (!($(evt.target).hasClass('bi-star-fill'))) {
    $(evt.target).attr('class', 'bi bi-star-fill');
    currentUser.addFavorite(storyId);

    //adds favorited story to 'favorited' class.
    $(evt.target).closest('li').toggleClass('favorited');
  } else {

    $(evt.target).attr('class', 'bi bi-star');
    $(evt.target).closest('li').toggleClass('favorited');
    currentUser.removeFavorite(storyId);
  }
}

/** Removes favorite from favorites page upon star click */

function removeFavoriteOnClick(evt) {
  const storyId = $(evt.target).closest('li').attr("id");
  //if (!($(evt.target).hasClass('bi-star-fill'))) {
  $(evt.target).attr('class', 'bi bi-star-fill');
  //  $(evt.target).attr('class', 'bi bi-star-fill');
  currentUser.removeFavorite(storyId);
  //   //adds favorited story to 'favorited' class.
  //   $(evt.target).closest('li').toggleClass('favorited');
  // } else {
  //   $(evt.target).attr('class', 'bi bi-star-fill');
  $(evt.target).closest('li').toggleClass('favorited');
  // }
}

$('#all-stories-list').on('click', 'i', addStoryToFavoriteOnClick);

//call on favorites-> clear elements on page-->

$favoritesList.on('click', 'i', removeFavoriteOnClick);

/** Adds stories on favorites page UI */

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoritesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $favoritesList.append($story);
  }
  $('.favorite-star').show();
}