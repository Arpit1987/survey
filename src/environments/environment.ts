// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const CONFIG_ADMIN_CREATE_KEY_MINSIZE = 5;
const CONFIG_ADMIN_CREATE_KEY_MAXSIZE = 50;
const CONFIG_ADMIN_CREATE_VALUE_MINSIZE = 2;
const CONFIG_ADMIN_CREATE_VALUE_MAXSIZE = 50;

const CONFIG_TEMPLATE_TEMPLATENAME_MINSIZE = 5;
const CONFIG_TEMPLATE_TEMPLATENAME_MAXSIZE = 50;
const CONFIG_TEMPLATE_TEMPLATEDESC_MAXSIZE=100;
const CONFIG_TEMPLATE_SECTIONNAME_MINSIZE=5;
const CONFIG_TEMPLATE_SECTIONNAME_MAXSIZE=50;
const CONFIG_TEMPLATE_SECTIONDESC_MAXSIZE=100;
const CONFIG_TEMPLATE_QUESTIONTITLE_MINSIZE=5;
const CONFIG_TEMPLATE_QUESTIONTITLE_MAXSIZE=100;

const CONFIG_CHECKLIST_TEMPLATENAME_MINSIZE=5;
const CONFIG_CHECKLIST_TEMPLATENAME_MAXSIZE=25;
const CONFIG_CHECKLIST_TEMPLATEDESC_MAXSIZE=100;

export const environment = {
  production: false,
  domain: "http://localhost:8080/",
  
  // Configuration parameters
  CONFIG_ADMIN_CREATE_KEY_MINSIZE,
  CONFIG_ADMIN_CREATE_KEY_MAXSIZE,
  CONFIG_ADMIN_CREATE_VALUE_MINSIZE,
  CONFIG_ADMIN_CREATE_VALUE_MAXSIZE,
  
  CONFIG_TEMPLATE_TEMPLATENAME_MINSIZE,
  CONFIG_TEMPLATE_TEMPLATENAME_MAXSIZE,
  CONFIG_TEMPLATE_TEMPLATEDESC_MAXSIZE,
  CONFIG_TEMPLATE_SECTIONNAME_MINSIZE,
  CONFIG_TEMPLATE_SECTIONNAME_MAXSIZE,
  CONFIG_TEMPLATE_SECTIONDESC_MAXSIZE,
  CONFIG_TEMPLATE_QUESTIONTITLE_MINSIZE,
  CONFIG_TEMPLATE_QUESTIONTITLE_MAXSIZE,
  
  CONFIG_CHECKLIST_TEMPLATENAME_MINSIZE,
  CONFIG_CHECKLIST_TEMPLATENAME_MAXSIZE,
  CONFIG_CHECKLIST_TEMPLATEDESC_MAXSIZE,

  CONFIG_ADMIN_VALIDATION_TEXT_KEY: `Required. min ${CONFIG_ADMIN_CREATE_KEY_MINSIZE} characters, max ${CONFIG_ADMIN_CREATE_KEY_MAXSIZE} characters, No space allowed. Unique Key needed`,
  CONFIG_ADMIN_VALIDATION_TEXT_VALUE: `Required. minimum ${CONFIG_ADMIN_CREATE_VALUE_MINSIZE} characters, maximum ${CONFIG_ADMIN_CREATE_VALUE_MAXSIZE} characters, No space allowed. Unique Value needed`,
  
  CONFIG_TEMPLATE_VALIDATION_TEXT_TEMPLATENAME: `Required. minimum ${CONFIG_TEMPLATE_TEMPLATENAME_MINSIZE} characters, maximum ${CONFIG_TEMPLATE_TEMPLATENAME_MAXSIZE} characters, No space in between. Unique Key needed`,
  CONFIG_TEMPLATE_VALIDATION_TEXT_TEMPLATEDESC: `maximum ${CONFIG_TEMPLATE_TEMPLATEDESC_MAXSIZE} characters`,
  CONFIG_TEMPLATE_VALIDATION_TEXT_SECTIONNAME:  `Required. minimum ${CONFIG_TEMPLATE_SECTIONNAME_MINSIZE} characters, maximum ${CONFIG_TEMPLATE_SECTIONNAME_MAXSIZE} characters, No space in between. Unique Key needed`,
  CONFIG_TEMPLATE_VALIDATION_TEXT_SECTIONDESC: `maximum ${CONFIG_TEMPLATE_SECTIONDESC_MAXSIZE} characters`,
  CONFIG_TEMPLATE_VALIDATION_TEXT_QUESTIONTITLE: `Required. minimum ${CONFIG_TEMPLATE_QUESTIONTITLE_MINSIZE} characters, maximum ${CONFIG_TEMPLATE_QUESTIONTITLE_MAXSIZE} characters, No space in between. Unique Key needed`,
 
  CONFIG_CHECKLIST_VALIDATION_TEXT_TEMPLATENAME: `Required. minimum ${CONFIG_CHECKLIST_TEMPLATENAME_MINSIZE} characters, maximum ${CONFIG_CHECKLIST_TEMPLATENAME_MAXSIZE} characters, No space in between. Unique Key needed`,
  CONFIG_CHECKLIST_VALIDATION_TEXT_TEMPLATEDESC: `maximum ${CONFIG_CHECKLIST_TEMPLATEDESC_MAXSIZE} characters`

};
