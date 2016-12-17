console.log("Sanity Check: JS is working!");

$(document).ready(function() {
    var profileLocation = $('#profile-location').html(),
        profileHB = Handlebars.compile(profileLocation);
        console.log(profileLocation);
    $.ajax({
        method: 'GET',
        url: '/api/profile',
        success: handleSuccess,
        error: handleError,
        dataType: 'json'
    });

    function handleSuccess(data){
      console.log(data);
    }
    function handleError(xhr, err){
      console.log('error');
    }
});
