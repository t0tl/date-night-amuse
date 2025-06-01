/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/instructions`; params?: Router.UnknownInputParams; } | { pathname: `/profile-setup`; params?: Router.UnknownInputParams; } | { pathname: `/swipe`; params?: Router.UnknownInputParams; } | { pathname: `/matches`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/instructions`; params?: Router.UnknownOutputParams; } | { pathname: `/profile-setup`; params?: Router.UnknownOutputParams; } | { pathname: `/swipe`; params?: Router.UnknownOutputParams; } | { pathname: `/matches`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/instructions${`?${string}` | `#${string}` | ''}` | `/profile-setup${`?${string}` | `#${string}` | ''}` | `/swipe${`?${string}` | `#${string}` | ''}` | `/matches${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/instructions`; params?: Router.UnknownInputParams; } | { pathname: `/profile-setup`; params?: Router.UnknownInputParams; } | { pathname: `/swipe`; params?: Router.UnknownInputParams; } | { pathname: `/matches`; params?: Router.UnknownInputParams; };
    }
  }
}
