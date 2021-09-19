# wiiscale-ifttt
Connect WiiScale to IFTTT

This app translates the output of [WiiScale](https://snosrap.com/wiiscale/) to the format [IFTTT Webhooks](https://ifttt.com/maker_webhooks/triggers/json_event) requires.

This allows you to use a Wii Fit balence board as a smart scale or integrate with your favorite health tracking service.

To use this container set the API_KEY and APPLET_NAME, then run `docker-compose up`

## Full Setup

1. Download and install [WiiScale](https://snosrap.com/wiiscale/)

1. In the WiiScale preferences, under the `Sharing` tab, enable the URL output. Use your server's IP address as the hostname and make sure the output is in JSON format.

1. Login to IFTTT and create a new applet.

1. Set the `If This` to `Receive a web request` and choose an event name.

1. Set the `Then That` to an appropriate service, I use iOS Health's Log weight action. Using the `Add ingredient` dialog use `Value1` for the weight in kilograms and `Value2` as the date.

1. Clone this repo onto the server you will be using.

1. Set the environment variables for your IFTTT action in `docker-compose.yaml`