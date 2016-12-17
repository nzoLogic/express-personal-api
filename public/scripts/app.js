console.log("Sanity Check: JS is working!");

$(document).ready(function() {
    var profileLocation = $('#profile-location').html(),
        profileHB = Handlebars.compile(profileLocation);
        console.log(profileLocation);
    $.ajax({
        method: 'GET',
        url: '/api/profile',
        success: handleProfile,
        error: handleError,
        dataType: 'json'
    });

    function handleProfile(profileData){
      $('header').append(profileHB({profile: profileData}));
    }
    function handleError(xhr, err){
      console.log('error');
    }
});
