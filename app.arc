@app
svelte-app

@http
get /admin-access
get /place/:id
put /place/:id
get /all-places
post /place
get /all-questions
post /question
put /question/:id
get /rating
put /rating

@shared
src src/shared # this is the default

@tables
data
  scopeID *String
  dataID **String
  ttl TTL