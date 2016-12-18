console.log("Sanity Check: JS is working!");
var profileInfo,
    projects = {};
$(document).ready(function() {
    var profileLocation = $('#profile-location').html(),
        projectsLocation = $('#projects-location').html(),
        profileHB = Handlebars.compile(profileLocation),
        projectsHB = Handlebars.compile(projectsLocation);
    $.ajax({
        method: 'GET',
        url: '/api/profile',
        success: handleProfile,
        error: handleError,
        dataType: 'json'
    });
    $.ajax({
      method: 'GET',
      url: '/api/projects',
      success: handleProjects,
      error: handleError,
      dataType: 'json'
    });
    // $.ajax({
    //   method: 'GET',
    //   crossDomain: true,
    //   url: 'http://api.forismatic.com/api/1.0/',
    //   success: handleInspiration,
    //   error: handleError,
    //   dataType: 'jsonp',
    //
    // });

      /*********
      event listeners
        *********/
    $('.projects-btn').click(showProj);

    function handleProfile(profileData){
      profileInfo = profileData;
      console.log(profileInfo);
      $('header').append(profileHB({profile: profileData}));
    }
    function handleProjects(allProjects){
      projects = allProjects;
    }
    function handleError(xhr, err){
      console.log('error', xhr, err);
    }
    function handleInspiration(data){
      console.log(data);
    }

    function showProj(event){
      console.log('cliick');
      projects.forEach(function(foundProject){
        $('main').append(projectsHB({project: foundProject}));
      });
    }
});
