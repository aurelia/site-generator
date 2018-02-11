# site-generator

This repository contains the code that generates the aurelia.io site. It is not meant to be a general-purpose site generator, but was made (quick and dirty) for needs specific to the Aurelia site. It uses a combination of traditional static site generation via Handlebars as well as progressive enhancement via Aurelia. The general techniques used in this generator are widely-applicable and can be used with other server-side frameworks. However, you may not want to mirror all implementations exactly, due to the specific nature of the needs being addressed here, and the hasty way in which things were implemented. In other words, this may not be the best code you've ever seen before...

## Commands

### `au-site generate`

Run this command to generate a site. You must run it from a folder with an 'au-site.json' file, which contains the configuration for the site to generate. An example configuration file is below.

### `au-site blog publish [file]`

Run this command to publish a blog post. The `file` references a file in the `drafts` subfolder of your configured `blog` folder.

### `au-site blog update [file]/[--all] [--no-date]`

Run this command to update an already published blog post. If you want to update all published posts, use the `--all` flag. If you want to perform updates without altering the publish date, use the `--no-date` flag. This command is useful when you want to regenerate the blog after you've made changes to the Markdown in the `published` folder. This command is also useful with the `--all` flag if you've changed the overall site styles, Aurelia app implementation or updated the article ToCs.

### `au-site blog migrate`

Run this command to import and migrate from a Ghost blog exported JSON file.

## Configuration

The site generator requires an `au-site.json` file in the folder from which you run the generator. This file specifies all the options, pages, etc. that make up the site. Here's the configuration that's used to generate the Aurelia site itself:

```JSON
{
  "name": "Aurelia",
  "siteUrl": "http://aurelia.io",
  "baseUrl": "/",
  "outDir": "./",
  "trackingID": "UA-38441871-6",
  "appearance": {
    "logoSrc": "./src/logo.svg"
  },
  "home": {
    "name": "Home",
    "description": "Aurelia is a JavaScript client framework for web, mobile and desktop that leverages simple conventions to empower your creativity.",
    "src": "./src/home.html",
    "dest": "home"
  },
  "blog": {
    "name": "The Aurelia Blog",
    "description": "The official blog of the Aurelia project and Core Team.",
    "dest": "blog",
    "src": "../blog",
    "postsPerPage": 7,
    "author": "AureliaEffect",
    "social": {
      "name": "Aurelia Channels",
      "twitter": "https://twitter.com/aureliaeffect",
      "github": "https://github.com/aurelia/framework",
      "vimeo": "https://vimeo.com/channels/867847",
      "gitter": "https://gitter.im/aurelia/Discuss"
    },
    "migration": {
      "src": "../blog/aurelia.ghost.2018-01-15.json"
    }
  },
  "forum": {
    "url": "https://discourse.aurelia.io",
    "name": "Discourse"
  },
  "help": {
    "name": "Help",
    "src": "./src/help.md",
    "dest": "help"
  },
  "notFound":{
    "name": "404",
    "description": "Not Found",
    "links": [
      {
        "href": "/docs/tutorials/creating-a-todo-app",
        "text": "Getting Started with Aurelia"
      },
      {
        "href": "/docs",
        "text": "Aurelia Guides"
      },
      {
        "href": "/docs/api",
        "text": "Aurelia APIs"
      },
      {
        "href": "/help",
        "text": "Help"
      }
    ]
  },
  "docs": {
    "article": [
      {
        "name": "Overview",
        "description": "Discover what Aurelia is along with its business and technical advantages.",
        "dest": "docs/overview",
        "items": [
          {
            "name": "What is Aurelia?",
            "src": "../framework/doc/article/en-US/what-is-aurelia.md",
            "dest": "docs/overview/what-is-aurelia",
            "featured": true
          },
          {
            "name": "Technical Benefits",
            "src": "../framework/doc/article/en-US/technical-benefits.md",
            "dest": "docs/overview/technical-benefits"
          },
          {
            "name": "Business Advantages",
            "src": "../framework/doc/article/en-US/business-advantages.md",
            "dest": "docs/overview/business-advantages"
          }
        ]
      },
      {
        "name": "Tutorials",
        "description": "Step-by-step tutorials teaching you how to build your first Aurelia applications.",
        "dest": "docs/tutorials",
        "items": [
          {
            "name": "Creating a Todo App",
            "src": "../framework/doc/article/en-US/quick-start.md",
            "dest": "docs/tutorials/creating-a-todo-app",
            "featured": true
          },
          {
            "name": "Creating a Contact Manager",
            "src": "../framework/doc/article/en-US/contact-manager-tutorial.md",
            "dest": "docs/tutorials/creating-a-contact-manager",
            "featured": true
          }
        ]
      },
      {
        "name": "Fundamentals",
        "description": "After you've completed the quick starts, learn more about Aurelia's app model, components, dependency injection and more.",
        "dest": "docs/fundamentals",
        "items": [
          {
            "name": "App Config and Startup",
            "src": "../framework/doc/article/en-US/app-configuration-and-startup.md",
            "dest": "docs/fundamentals/app-configuration-and-startup"
          },
          {
            "name": "Creating Components",
            "src": "../framework/doc/article/en-US/creating-components.md",
            "dest": "docs/fundamentals/components"
          },
          {
            "name": "Dependency Injection",
            "src": "../dependency-injection/doc/article/en-US/dependency-injection-basics.md",
            "dest": "docs/fundamentals/dependency-injection"
          },
          {
            "name": "Securing Your App",
            "src": "../framework/doc/article/en-US/securing-your-app.md",
            "dest": "docs/fundamentals/security"
          },
          {
            "name": "Cheat Sheet",
            "src": "../framework/doc/article/en-US/cheat-sheet.md",
            "dest": "docs/fundamentals/cheat-sheet"
          }
        ]
      },
      {
        "name": "Binding",
        "description": "Learn all about Aurelia's powerful data-binding engine.",
        "dest": "docs/binding",
        "items": [
          {
            "name": "Binding Basics",
            "src": "../binding/doc/article/en-US/binding-basics.md",
            "dest": "docs/binding/basics"
          },
          {
            "name": "Class and Style",
            "src": "../binding/doc/article/en-US/binding-class-and-style.md",
            "dest": "docs/binding/class-and-style"
          },
          {
            "name": "Binding Checkboxes",
            "src": "../binding/doc/article/en-US/binding-checkboxes.md",
            "dest": "docs/binding/checkboxes"
          },
          {
            "name": "Binding Radios",
            "src": "../binding/doc/article/en-US/binding-radios.md",
            "dest": "docs/binding/radios"
          },
          {
            "name": "Binding Selects",
            "src": "../binding/doc/article/en-US/binding-selects.md",
            "dest": "docs/binding/selects"
          },
          {
            "name": "Delegate vs. Trigger",
            "src": "../binding/doc/article/en-US/binding-delegate-vs-trigger.md",
            "dest": "docs/binding/delegate-vs-trigger"
          },
          {
            "name": "Computed Properties",
            "src": "../binding/doc/article/en-US/binding-computed-properties.md",
            "dest": "docs/binding/computed-properties"
          },
          {
            "name": "Value Converters",
            "src": "../binding/doc/article/en-US/binding-value-converters.md",
            "dest": "docs/binding/value-converters"
          },
          {
            "name": "Binding Behaviors",
            "src": "../binding/doc/article/en-US/binding-binding-behaviors.md",
            "dest": "docs/binding/binding-behaviors"
          },
          {
            "name": "Observable Properties",
            "src": "../binding/doc/article/en-US/binding-observable-properties.md",
            "dest": "docs/binding/binding-observable-properties"
          },
          {
            "name": "How it Works",
            "src": "../binding/doc/article/en-US/binding-how-it-works.md",
            "dest": "docs/binding/how-it-works"
          }
        ]
      },
      {
        "name": "Templating",
        "description": "Learn all about Aurelia's powerful templating engine.",
        "dest": "docs/templating",
        "items": [
          {
            "name": "Templating Basics",
            "src": "../templating/doc/article/en-US/templating-basics.md",
            "dest": "docs/templating/basics"
          },
          {
            "name": "HTML Behaviors",
            "src": "../templating/doc/article/en-US/templating-html-behaviors-introduction.md",
            "dest": "docs/templating/html-behaviors-introduction"
          },
          {
            "name": "Custom Attributes",
            "src": "../templating/doc/article/en-US/templating-custom-attributes.md",
            "dest": "docs/templating/custom-attributes"
          },
          {
            "name": "Custom Elements",
            "src": "../templating/doc/article/en-US/templating-custom-elements.md",
            "dest": "docs/templating/custom-elements"
          },
          {
            "name": "Content Projection",
            "src": "../templating/doc/article/en-US/templating-content-projection.md",
            "dest": "docs/templating/content-projection"
          },
          {
            "name": "Dynamic UI Composition",
            "src": "../templating/doc/article/en-US/templating-dynamic-ui-composition.md",
            "dest": "docs/templating/dynamic-ui-composition"
          }
        ]
      },
      {
        "name": "Routing",
        "description": "Learn how to setup and configure Aurelia's router.",
        "dest": "docs/routing",
        "items": [
          {
            "name": "Router Configuration",
            "src": "../router/doc/article/en-US/router-configuration.md",
            "dest": "docs/routing/configuration"
          }
        ]
      },
      {
        "name": "Plugins",
        "description": "Learn about Aurelia's officially supported plugins and how to use them.",
        "dest": "docs/plugins",
        "items": [
          {
            "name": "HTTP",
            "src": "../fetch-client/doc/article/en-US/http-services.md",
            "dest": "docs/plugins/http-services"
          },
          {
            "name": "Validation",
            "src": "../validation/doc/article/en-US/validation-basics.md",
            "dest": "docs/plugins/validation"
          },
          {
            "name": "I18N",
            "src": "../i18n/doc/article/en-US/i18n-with-aurelia.md",
            "dest": "docs/plugins/i18n"
          },
          {
            "name": "Dialog",
            "src": "../dialog/doc/article/en-US/dialog-basics.md",
            "dest": "docs/plugins/dialog"
          }
        ]
      },
      {
        "name": "Integration",
        "description": "Learn how to integrate Aurelia with various other libraries and frameworks.",
        "dest": "docs/integration",
        "items": [
          {
            "name": "Integrating with Polymer",
            "src": "../framework/doc/article/en-US/integrating-with-polymer.md",
            "dest": "docs/integration/polymer"
          }
        ]
      },
      {
        "name": "Testing",
        "description": "Learn all about testing Aurelia apps, including component testing and e2e testing.",
        "dest": "docs/testing",
        "items": [
          {
            "name": "Testing Components",
            "src": "../testing/doc/article/en-US/testing-components.md",
            "dest": "docs/testing/components"
          },
          {
            "name": "End-to-End Testing",
            "src": "../testing/doc/article/en-US/end-to-end-testing.md",
            "dest": "docs/testing/end-to-end"
          }
        ]
      },
      {
        "name": "Build Systems",
        "description": "Learn about the various build setups that Aurelia supports out-of-the-box.",
        "dest": "docs/build-systems",
        "items": [
          {
            "name": "The Aurelia CLI",
            "src": "../framework/doc/article/en-US/the-aurelia-cli.md",
            "dest": "docs/build-systems/aurelia-cli"
          },
          {
            "name": "Webpack",
            "description": "Setup and bundling using the Webapck system.",
            "dest": "docs/build-systems/webpack",
            "items": [
              {
                "name": "Webpack Setup",
                "src": "../framework/doc/article/en-US/setup-webpack.md",
                "dest": "docs/build-systems/webpack/setup"
              },
              {
                "name": "Webpack Bundling",
                "src": "../framework/doc/article/en-US/bundling-webpack.md",
                "dest": "docs/build-systems/webpack/bundling"
              }
            ]
          },
          {
            "name": "JSPM",
            "description": "Setup and bundling using the JSPM system.",
            "dest": "docs/build-systems/jspm",
            "items": [
              {
                "name": "JSPM Setup",
                "src": "../framework/doc/article/en-US/setup-jspm.md",
                "dest": "docs/build-systems/jspm/setup"
              },
              {
                "name": "JSPM Bundling",
                "src": "../framework/doc/article/en-US/bundling-jspm.md",
                "dest": "docs/build-systems/jspm/bundling"
              }
            ]
          }
        ]
      }
    ],
    "api": [
      {
        "name": "Binding",
        "package": "../binding/package.json",
        "src": "../binding/dist/aurelia-binding.d.ts",
        "dest": "docs/api/binding",
        "exampleSrc": "../binding/doc/example-dist",
        "exampleDest": "example"
      },
      {
        "name": "Bootstrapper",
        "package": "../bootstrapper/package.json",
        "src": "../bootstrapper/dist/aurelia-bootstrapper.d.ts",
        "dest": "docs/api/bootstrapper"
      },
      {
        "name": "Dependency Injection",
        "package": "../dependency-injection/package.json",
        "src": "../dependency-injection/dist/aurelia-dependency-injection.d.ts",
        "dest": "docs/api/dependency-injection"
      },
      {
        "name": "Event Aggregator",
        "package": "../event-aggregator/package.json",
        "src": "../event-aggregator/dist/aurelia-event-aggregator.d.ts",
        "dest": "docs/api/event-aggregator"
      },
      {
        "name": "Fetch",
        "package": "../fetch-client/package.json",
        "src": "../fetch-client/dist/aurelia-fetch-client.d.ts",
        "dest": "docs/api/fetch-client"
      },
      {
        "name": "Framework",
        "package": "../framework/package.json",
        "src": "../framework/dist/aurelia-framework.d.ts",
        "dest": "docs/api/framework"
      },
      {
        "name": "History",
        "package": "../history/package.json",
        "src": "../history/dist/aurelia-history.d.ts",
        "dest": "docs/api/history"
      },
      {
        "name": "History-Browser",
        "package": "../history-browser/package.json",
        "src": "../history-browser/dist/aurelia-history-browser.d.ts",
        "dest": "docs/api/history-browser"
      },
      {
        "name": "I18N",
        "package": "../i18n/package.json",
        "src": "../i18n/dist/aurelia-i18n.d.ts",
        "dest": "docs/api/i18n"
      },
      {
        "name": "Loader",
        "package": "../loader/package.json",
        "src": "../loader/dist/aurelia-loader.d.ts",
        "dest": "docs/api/loader"
      },
      {
        "name": "Loader-Default",
        "package": "../loader-default/package.json",
        "src": "../loader-default/dist/aurelia-loader-default.d.ts",
        "dest": "docs/api/loader-default"
      },
      {
        "name": "Logging",
        "package": "../logging/package.json",
        "src": "../logging/dist/aurelia-logging.d.ts",
        "dest": "docs/api/logging"
      },
      {
        "name": "Logging-Console",
        "package": "../logging-console/package.json",
        "src": "../logging-console/dist/aurelia-logging-console.d.ts",
        "dest": "docs/api/logging-console"
      },
      {
        "name": "Metadata",
        "package": "../metadata/package.json",
        "src": "../metadata/dist/aurelia-metadata.d.ts",
        "dest": "docs/api/metadata"
      },
      {
        "name": "Platform Abstraction Layer (PAL)",
        "package": "../pal/package.json",
        "src": "../pal/dist/aurelia-pal.d.ts",
        "dest": "docs/api/pal"
      },
      {
        "name": "PAL-Browser",
        "package": "../pal-browser/package.json",
        "src": "../pal-browser/dist/aurelia-pal-browser.d.ts",
        "dest": "docs/api/pal-browser"
      },
      {
        "name": "Path",
        "package": "../path/package.json",
        "src": "../path/dist/aurelia-path.d.ts",
        "dest": "docs/api/path"
      },
      {
        "name": "Router",
        "package": "../router/package.json",
        "src": "../router/dist/aurelia-router.d.ts",
        "dest": "docs/api/router"
      },
      {
        "name": "Task Queue",
        "package": "../task-queue/package.json",
        "src": "../task-queue/dist/aurelia-task-queue.d.ts",
        "dest": "docs/api/task-queue"
      },
      {
        "name": "Templating",
        "package": "../templating/package.json",
        "src": "../templating/dist/aurelia-templating.d.ts",
        "dest": "docs/api/templating"
      },
      {
        "name": "Templating-Binding",
        "package": "../templating-binding/package.json",
        "src": "../templating-binding/dist/aurelia-templating-binding.d.ts",
        "dest": "docs/api/templating-binding"
      },
      {
        "name": "Templating-Resources",
        "package": "../templating-resources/package.json",
        "src": "../templating-resources/dist/aurelia-templating-resources.d.ts",
        "dest": "docs/api/templating-resources"
      },
      {
        "name": "Templating-Router",
        "package": "../templating-router/package.json",
        "src": "../templating-router/dist/aurelia-templating-router.d.ts",
        "dest": "docs/api/templating-router"
      },
      {
        "name": "Testing",
        "package": "../testing/package.json",
        "src": "../testing/dist/commonjs/aurelia-testing.d.ts",
        "dest": "docs/api/testing"
      }
    ]
  },
  "search": true,
  "footer": {
    "copyright": "Copyright © 2010 - 2018 <a href=\"http://www.bluespire.com\">Blue Spire Inc.</a> Code licensed under the MIT License. Content licensed under CC0.",
    "columns": [
      {
        "name":"Resources",
        "links": [
          {
            "href": "docs/overview/what-is-aurelia",
            "text": "About"
          },
          {
            "href": "blog",
            "text": "Blog"
          },
          {
            "href": "http://eepurl.com/ces50j",
            "text": "Newsletter"
          }
        ]
      },
      {
        "name":"Help",
        "links": [
          {
            "href": "https://discourse.aurelia.io/",
            "text": "Discourse"
          },
          {
            "href": "https://gitter.im/aurelia/Discuss",
            "text": "Gitter"
          },
          {
            "href": "https://stackoverflow.com/search?q=aurelia",
            "text": "Stack Overflow"
          }
        ]
      },
      {
        "name":"Community",
        "links": [
          {
            "href": "https://github.com/aurelia",
            "text": "GitHub"
          },
          {
            "href": "https://twitter.com/aureliaeffect",
            "text": "Twitter"
          },
          {
            "href": "https://github.com/orgs/aurelia/people",
            "text": "Team"
          }
        ]
      }
    ]
  }
}
```

Additionally, in the `appearance` section of the configuration, you can override Sass variables, like so:

```
"appearance": {
  "logoSrc": "./src/logo.svg",
  "variableOverrides": {
    "$primary-color": "#0E5698",
    "$accent-color": "#328CC7"
  }
}
```

The full list of Sass variables can be found in `lib/app/sass/_variables.scss`.
