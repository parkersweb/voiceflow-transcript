# Voiceflow Transcript

A plugin to create Figma design elements directly from a Voiceflow transcript.

Pre-requisites:

- [Voiceflow Account](https://voiceflow.com)
- [Figma desktop app](https://figma.com/downloads/)

## Connecting your Voiceflow account

You'll need a Voiceflow API key and a Project ID to fetch transcript information. Information on how to create an API key is provided [here](https://developer.voiceflow.com/docs/step-1-get-api-key). Information on where your project ID is located can be found [here](https://docs.voiceflow.com/reference/project-ids-and-versions).

Transcripts can be created either using a specific transcript ID, or from a recent transcript:

- **Using a transcript ID** - browse to the transcript you would like to use; the transcript ID is the last part of the URL i.e. `https://creator.voiceflow.com/project/<ID>/transcripts/<TRANSCRIPT_ID>`

- **Recent transcript** - the dropdown shows some of the most recent transcripts from the project.

### Contributing

PRs welcome - to run the plugin locally, checkout the current version then run:

```bash
npm install
npm run watch
```

More information on setting up your development environment is available [here](https://yuanqing.github.io/create-figma-plugin/quick-start/#installing-the-plugin-widget).

### Acknowledgements

This plugin is built with [Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/).

### License

[MIT](/LICENSE.md)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K1WJT36)
