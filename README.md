# API description
 A JSON data API consisting of personal profile information, professional contact info, and a collection of projects I've worked on.
## Data Structures
  ### Profile
    -name:
    -githubUsername:
    -githubProfileImage:
    -personalSite:
    -currentCity:
    -pets:
  ### Projects
    -title:
    -author:
    -description:
    -link:
##Routes
  -GET(/api/profile)
    -returns JSON formatted Profile data
  -GET(/api/projects)
    -returns a collection of all current projects if no parameters are sent with request
  -GET(/api/projects/:title)
    -returns a project with the value of the parameter passed
  ### Admin only
  -POST(/api/projects)
    -admin only, updates and adds a new project to Project collection
  -PATCH(/api/projects/:title)
    -updates a project by title using form data. Form keys should be consistent with Projects data Structures
  -DELETE(/api/projects/:title)
    -deletes a project by title
