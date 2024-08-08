july 6-7
-------
- [x] fix: rr tags were displaying past 2 digits
- [x] fix: migrated the copy clipboard notifs to more stable ones
- [x] fix: when 100+ pending cards were in render, dark/light mode switching looked tacky and laggy
- [x] fix: trades with no tp3 we're showing a 0 for tp3 level, now it wont display tp if value=0
- [x] fix: improved the screen responsiveness of the algo settings input fields
- [x] fix: moved all filter states to ZuStand
- [x] fix: desktop semi-ipad view header is not item-centered
- [x] fix: when in approving loading button state its still hoverable
- [x] fix: created_at db time was shown and not generation time
- [x] fix: when in drilldown mode you can still vertical scroll

- [x] feat: added hour/minute based time to the time key in the pending card
- [x] feat: added global filters, (trade status, date range, algorithm id)
- [x] feat: added tag for algorithm id in card
- [x] feat: stackable filters


july 8-9
-------
- [x] fix: when clicked on clear filter the loading state text is black
- [x] fix: when on clear all filters it gets stuck 
- [x] fix: date picker does not include in time
- [x] fix: change am/pm to 24hr clock
- [x] fix: when date is not available stuck loading

- [x] feat: added notification when approved signal or page refresh

july 17
- [x] fix: loggedInUserCard hover is not width responsive
- [x] fix: tf and time card can overlap when horizontal on pending card
- [x] fix: mobile header is extremely unreliable with hamburber menu

patched: loggedInUserCard hover is not width responsive ------ introduced the hamburger menu to combat this

feat: added notification when approved signal or page refresh
feat: added hamburger menu on mobile /manage/


july 20
- [x] todo: add buffer loader to not render more than what the viewport allows
- [x] todo: trade search focus search
- [x] bug: when refreshing in drilldown mode it will render all objects again not just the drilldownone
- [x] bug: loggedInUserCard hover is not width responsive
- [x] bug: when switching between algo settings the ccheck card swtich states act weird
- [x] bug: tf and time card can overlap when horizontal on pending card
- [x] low_bug: when org is switched filters should be cleared




july 25





-- todo

- [ ] todo: add search bar for strategies
- [ ] todo: complete user onboard flow
- [ ] todo: add strategy creation flow
- [ ] todo: populate all
- [ ] todo: add clear filter button
- [ ] todo: current applied filters bar
- [ ] todo: keep pendingtrades filtered in localstorage and update it so u dont need to keep calling a refreshal
- [ ] bug: when loading i see a small flash of `no trades found` even though its still gonna reload


