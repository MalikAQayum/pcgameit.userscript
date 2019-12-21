# PCGameit.com pcgameit.userscript

Userscript to auto accept granted curator appids / packages.

## Installation

Click Install to add it to Tampermonkey : [Install](https://github.com/MalikAQayum/pcgameit.userscript/raw/master/PCGICurators.user.js) .

## Usage and how it works.

**Once PCGI Userscript has been installed, it runs in the background on the https://store.steampowered.com.**

- Go to any https://store.steampowered.com related pages or stay on the main page, and it will trigger itself every 6 min on set times of the hour; 
  - minute 0 (skipped)
  - minute 6
  - minute 12
  - minute 18
  - minute 24
  - minute 30 (skipped)
  - minute 36
  - minute 42
  - minute 48
  - minute 54
- If you are set (been notifified that you have been set) to be the claimer, then let it idle in these specific minutes of the hour, to avoid interupting it, on any store.steampowered.com page.
- If you have not been notifified, then you can let it idle and check the console yourself, to see if you have been set to claim.

## WIP

**Expanding features**
- ability to see owned games on the pcgameit website, pages;
	- app
	- key
	- curator log
	- key log
