import $ from 'jquery';

var forEach = function(arr,cb){for(var i = 0; i < arr.length; i++){ cb(arr[i], i, arr)  } }

var inputNewContent = document.querySelector('.content-container')

var userProfile = 'cameronbolus'
var userSearch = document.querySelector('.search-bar')

userSearch.addEventListener('keydown', function(event){
  var searchBarValue = userSearch.value
  if (event.which === 13) {
    userProfile = searchBarValue
  }
})

function controllerRouter(){
  inputNewContent.innerHTML = `
    <div class="profile-container">
    </div>

    <div class="repos-container">
      <div class="repos-nav">
        <div>Overview</div>
        <div>Repositories</div>
        <div>Stars</div>
        <div>Followers</div>
        <div>Following</div>
      </div>
      <hr/>
      <div class="search-repos">
        <input class="repos-search-bar" type="text" name="" value="" placeholder="Search repositories">
        <div class="Type-repo-button">Type</div>
        <div class="language-repo-button">Language</div>
        <div class="new-repo-button">New</div>
      </div>
      <hr/>
      <div class="repos-list">
      </div>
    </div>

  `

  $.getJSON(`https://api.github.com/users/${userProfile}`).then(function(serverRes){
    var profileContainer = document.querySelector('.profile-container')
    var htmlTemplate = createGitHubProfileInfo(serverRes, "Cameron-info")
    profileContainer.innerHTML = htmlTemplate
  })
  $.getJSON(`https://api.github.com/users/${userProfile}/repos`).then(function(serverRes){
    var reposContainer = document.querySelector('.repos-container .repos-list')
    var htmlTemplate = createGitHubRepos(serverRes, "Cameron-repos")
    reposContainer.innerHTML = htmlTemplate
  })

}

///////Search bar event listener ///////



//////API functions//////

function createGitHubProfileInfo(dataObj, profileInfo){

  var largeHtmlString = ''

  return largeHtmlString += `
    <img src="${dataObj.avatar_url}">
    <h1>${dataObj.name}</h1>
    <h2>cameronbolus</h2>
    <hr/>
    <h4><i class="fa fa-link profile-icon" aria-hidden="true"></i>${dataObj.blog}</h4>
    <h4><i class="fa fa-map-marker profile-icon" aria-hidden="true">  </i>${dataObj.location}</h4>
    <h4><i class="fa fa-envelope-o profile-icon" aria-hidden="true"></i>${dataObj.email}</h4>
    <h4><i class="fa fa-link profile-icon" aria-hidden="true"></i>${dataObj.html_url}</h4>
  `
}

function createGitHubRepos(dataArray, repo){

  var largeHtmlString = ''

  forEach(dataArray, function(articleObj){
    largeHtmlString += `
      <ul class="repo-list">
        <li><h3>${articleObj.html_url}</h3></li>
        <li><h2>${articleObj.name}</h2></li>
        <li>${articleObj.updated_at}</li>
      </ul>
      <hr/>
    `
  })
  return largeHtmlString
}

window.addEventListener('hashchange', controllerRouter )
controllerRouter()
