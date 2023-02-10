import {apiInitializer} from "discourse/lib/api";

export default apiInitializer("0.11.1", api => {
  console.log(api.settings);

  api.container.lookup("model:login-method").constructor.reopen({
    // login method is tidb cloud
    get isCloud() {
      return this.name === "oauth2_basic";
    },

    // login method is github
    get isGithub() {
      return this.name === "github";
    },

    get customizedTitle() {
      switch (this.name) {
        case 'oauth2_basic':
          return 'TiDB Cloud';
        case 'github':
          return 'Github';
        case 'google_oauth2':
          return 'Google';
        default:
          return this.name;
      }
    },
  });

  api.container.lookup("component:login-buttons").constructor.reopen({
    get cloudButton() {
      return this.buttons.find(button => button.name === 'oauth2_basic');
    },
    get googleButton() {
      return this.buttons.find(button => button.name === 'google_oauth2');
    },
    get githubButton() {
      return this.buttons.find(button => button.name === 'github');
    },
    get privacyPolicyUrl() {
      return Discourse.SiteSettings.privacy_policy_url;
    },
    get termOfServiceUrl() {
      return '/tos';
    },
  });
});
