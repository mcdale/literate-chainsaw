# literate-chainsaw
openui5 spring-boot starter
Notes:
Gruntfile includes a task to symlink downloaded openui5-runtime-{version}/resources to the webapp source and dist folders
Changes the openui5 sample application to remove bower openui5/* packages and selects the sap_belize theme.
## run
### openui5 development:
` grunt serve `
http://localhost:4020

### sprint-boot app:
` grunt build `
` mvn spring-boot:run `
http://localhost:8080

