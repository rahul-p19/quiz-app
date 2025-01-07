# INFINITIEEE

> How to access admin controls?

Head over to [admin signup](https://hello.ieee-jaduniv.in/signup-admin) to create an admin account using the admin code (consult a tech team member for the code).
In case you already have an account or there is some issue with the admin signup, ask someone from the tech team to edit your role.

After logging in, head over to /admin.

## Quiz Working

It'll be a live quiz - we decide which question is visible to the user, and whether they're able to navigate or not. The plan is to show the questions one by one, and then at the end, allow navigation
and give them some time to check all answers and freely navigate, then submit.

There is only one submit button for the entire quiz, and on clicking it'll show a confirmation popup before actual submission.

- Initially they come to /quiz and see nothing.

- We set a question by entering a question id (between 1 and 20), and on submitting, the question gets broadcasted to all connected users. We can set questions 1 by 1 in this manner.

- They are not able to navigate right now, only access the question we sent them. To allow them to navigate, click Allow navigate on the admin panel. Conversely to stop them from navigating, press stop navigation.

- Should not be needed but there's also a stop question button which will stop them from being able to see questions, and allow question reverses this.

- Stop quiz will disconnect all users - to restart after this, they'll have to refresh and you'll have to setQuestion or allowNavigation again.

Also provided add Question and delete Question form, should not be needed and i would suggest directly accessing from prisma studio if it is needed.

> What if someone can't see the questions?

Try sending the question again from the admin side, ask them to wait for some time, if it still doesn't work, ask them to refresh.

If it's happening with a single/handful of people, maybe ask them to try another browser. Ask them to try mobile data because I don't believe Jadavpur wifi can be trusted.
