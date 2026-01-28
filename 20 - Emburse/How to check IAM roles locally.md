
Lets first make sure we are connected to aws via sso.
Lets check if we are connected (sts get-caller-identity), if not configure better.

Use update-kubeconfig to have access.

Check with current-context

search for nampesapce with `get namespaces`

set namespace to save on typing -n each time