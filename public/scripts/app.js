console.log("Sanity Check: JS is working!");
var profileInfo,
    projects = {},
    quotes;
$(document).ready(function() {
    var profileLocation = $('#profile-location').html(),
        projectsLocation = $('#projects-location').html(),
        fullProfileLocation = $('#fullProfile').html(),
        inspirationLocation = $('#inspirationSection').html(),
        profileHB = Handlebars.compile(profileLocation),
        projectsHB = Handlebars.compile(projectsLocation),
        fullProfileHB = Handlebars.compile(fullProfileLocation)
        inspirationHB = Handlebars.compile(inspirationLocation);
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

      /*********
      event listeners
        *********/
    $('.projects-btn, .x').click(showProj);
    $('.add-project').submit(function(event){
      event.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/projects',
        success: addedProject,
        error: handleError,
        data: $(this).serializeArray()
      });
      $('.delete-project').submit(function(event){
        event.preventDefault();
        console.log(event);
        $.ajax({
          method: 'DELETE',
          url: '/api/projects',
          success: handleDelete,
          error: handleError,
          data: $(this).serializeArray()
        });
      })

    });
    $('.profile-button').click(function(){
      $('.full-profile').toggleClass('add-height');
    })
    $('.inspiration').click(function(){
      setTimeout(function(){
        $('.inspiration-station').toggleClass('full-width');
      }, 5000);
      $('.inspiration-station').toggleClass('full-width');
    });

    function handleProfile(profileData){
      profileInfo = profileData;
      quotes = profileData.quotes;
      $('.home').append(profileHB({profile: profileData}));
      $('.full-profile').append(fullProfileHB({profile: profileData}));
      $('.inspiration-station').append(inspirationHB({quote: quotes[randomQuote(quotes)]}));
    }
    function handleProjects(allProjects){
      projects = allProjects;
    }
    function handleError(xhr, err){
      console.log('error', xhr, err);
    }

    function showProj(event){
      $('.project-display').toggleClass('quarter-width');
      projects.forEach(function(foundProject){
        $('.project-display').append(projectsHB({project: foundProject}));
      });
    }
    function addedProject(proj){
      $('.alert').html('Success!');
      setTimeout(function(){
      $('.modal-footer').modal('toggle');
    }, 1500);
    }
    function handleDelete(proj){
      console.log(proj)
    }

    function randomQuote(quotes){
      return Math.floor(Math.random() * quotes.length);
    }
});
