# PCGameit.com pcgameit.userscript

Userscript to auto accept granted curator appids / packages.

## Installation

Click Install to add it to Tampermonkey : [Install](https://github.com/MalikAQayum/pcgameit.userscript/raw/master/PCGICurators.user.js) .

## Usage and how it works.

**Once PCGI Userscript has been installed, it runs in the background on the https://store.steampowered.com.**

- Go to any https://store.steampowered.com related pages or stay on the main page, and it will trigger itself every 20 min on set times of the hour; 
  - minute 7
  - minute 27
  - minute 47 
- If you are set (been notifified that you have been set) to be the claimer, then let it idle in these specific minutes of the hour, to avoid interupting it, on any store.steampowered.com page.
- If you have not been notifified, then you can let it idle and check the console yourself, to see if you have been set to claim.