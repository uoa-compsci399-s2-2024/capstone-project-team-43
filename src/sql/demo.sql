INSERT INTO PROJECT
    (title, description, owner_id, other_client_details, preferred_skills, special_requirements, available_resources, deliverable, created, semester_id, status, max_teams, project_number, published, expiry, client_name, client_email, available_from)
VALUES
('Performance enhancement of a Julia Monte Carlo code for melting simulations','Performance improvement of our Julia code (serial version) to achieve comparable efficiency as we had for the
Fortran version. A plus would be to have a parallel version of the code that runs on NeSIs supercomputer','6', NULL, 'Needed skills can be acquired during the project; any prior experience with GitHub, Visual Studio Code, Julia
programming language or supercomputers is helpful but not a prerequisite', NULL, 'Julia documentation: https://docs.julialang.org/en/v1/
Julia tutorials: https://julialang.org/learning/tutorials/
Monte Carlo melting code: https://github.com/ElkePahl/ParallelTemperingMonteCarlo.jl', NULL, '2024-08-01','6','pending','3','43', 'false', '2026-10-01', 'john', 'john@gmail.com', '2024-05-14'),
    ('Gamification of Sustainable Transition Pathways','A game version that allows for different pathways, something interactive and professional-looking. It would be ideal if it
could be a webpage itself or, second best, exist on a webpage. It needs to be editable in the future so that we can
change links between variables as we discover them. It would need to be able to handle lots of different paths as no
two companies are the same, and there will be lots of combinations of initiatives (but something basic should still work,
just needs to be able to handle random combinations).
Likely two avatars - one is the game that asks the questions and makes statements (maybe a kiwi?) and the other
would be the player (a managerial-looking individual).
An ability to store data (firm size, type, current initiatives) and the potential path they build as well as the email so that
we may be able to send future communications (if they opt-in). Keeping the data at a minimum would help us get an
index of what firms are currently doing and their current paths.','1', NULL, NULL, NULL, NULL, 'We are interested in having a candy-land style game developed, to help us communicate our research findings to managers and
implement them in practice. The goal is to help managers understand differences in sustainability initiatives that can be implemented in their
firms and how to build sustainable transition pathways (to make their business models more sustainable). This would require the game to
allow for an initial collection of data on firms, and their current sustainability initiatives, and then allow them to select new potential initiatives
to implement and see how they interact.
This would lead to their path progressing (new squares appearing), sliding backwards, getting stuck in a loop, etc. The game would need to
be editable in the future, so we can alter links between various sustainability initiatives (recycling, paying above a living wage, etc.), add
additional initiatives, etc. as we discover them in the data.', '2024-08-01','2','accepted','3','43', 'false', '2025-08-01', 'john', 'john@gmail.com', '2024-02-24'),
    ('Online Platform Capstone Link','The Capstone teaching team requires a platform to automate the process of project collection and allocation. Currently, the procedure is
excessively time-consuming, involving multiple email exchanges between project clients, students, and the teaching team. Additionally,
there is a tedious data aggregation process for the information submitted through Microsoft Forms.
Using this project as an example, the following steps are implemented before each team learns about their assigned project:
- The project description is submitted via a Microsoft Form, which is then assessed by the course coordinator.
- If there are any issues, such as missing details, the author of the proposal is contacted via email and asked to clarify the project, fix the
description, or add resources.
- If the project proposal is satisfactory, it is added to a list of projects to be offered to students.
- Once the list of projects is complete, it is published on Canvas.
- The course coordinator creates a Microsoft Form where student teams can bid for their favourite project.
- When the bidding process ends, the course coordinator allocates projects based on student preferences.
- The course coordinator notifies the teams about their allocated project.
The platform should have the functionality to automate (or eliminate) each step of the process.','1', NULL, 'JS, HTML, Google Firebase, Game Dev (Unity/ React or similar)', NULL, NULL, 'App package suitable for uploading to both Apple App Store and Google Play Store', '2024-08-01','1','accepted','3','43', 'false', '2026-08-01', 'john', 'john@gmail.com', '2023-10-08'),
    ('Low / non-profit dating app that maximizes usefulness','Dating apps these days confine users to overpriced paywalls, mindless swiping and algorithms that discriminate and game the app towards
addiction rather than actually maximizing the odds of finding a suitor.
The world needs a dating app that it is not controlled by a greedy monopoly. It puts transparency, fairness, and real connection above
profits.','3', NULL, 'react native / expo', NULL, NULL, '-having no paywalls
-algorithms that dont discriminate and give max chance of matching (every like and person is visible within a users
settings)
-toggle between swipe view and list view
-who likes you screen, can filter/sort.
-a maybe button / watchlist
-sort by interests / hobbies
-sort by distance
-filter by gender, age, interests.
-in app messaging
-profiles include interests tags, bio, age, photos, drug/alcohol/smoking tags
-report profiles feature
-Any other features you think will help people find a match.', '2024-08-01','2','accepted','3','43', 'false', '2025-08-01', 'john', 'john@gmail.com', '2023-04-27'),
    ('Chatbots as Interactive Storytellers','Storytelling and dialogue have long been an area of interest in Cognitive Computer Science, but strongly limited by the lack of novelty and imagination that a hard-coded system can display. This project aims to explore the potential of generative LLMs (ChatGPT) for creating fun and novel storytelling controlled by prompts from an underlying dungeon master program. Students will work on developing a consistent and robust storytelling engine to track characters, intentions and world-state. Then, they will utilise the ChatGPT API for fresh ideas, and to transform the data representations within the engine into engaging human-readable text, resulting in a Choose-Your-Own-Adventure-style narrative. Depending on progress, next steps would include looking into the quality of storytelling, through elements such as pacing, problem-and-resolution cycles and character development; and potentially building a UI for better user experience.','1', NULL, NULL, NULL, NULL, 'An MVP would look like a basic engine to control things such as character status, inventory and location, as well as a successfully integrated chatbot to provide a scene and a set of reasonable interactive choices for the reader to make. If the choices and story are consistent, I will consider the MVP to be met.', '2024-08-01','1','rejected','3','43', 'false', '2025-09-01', 'john', 'john@gmail.com', '2022-07-14'),
    ('Te Tuhi Disability Training Cafe platform for trainees','The Behaviour Analysis Programme at the university specialises in partnering with organisations who support people with disabilities (including dementia, brain injury, and intellectual disabilities). One of our ongoing projects is the Te Tuhi cafe for training people with disabilities (https://www.times.co.nz/news/cooking-up-opportunity- new-training-cafe-at-te-tuhi/; https://tetuhi.art/about/te-tuhi-cafe/). The next step in our project is to create an electronic platform on which to store data, track a trainees progress, and create a one-stop-shop for all the programmes in the project. We would love to collaborate to develop this - its outside our expertise!','1', NULL, NULL, NULL, 'We could also take students to the cafe to meet the team and see how it operates. We have a number of documents that we can share that explain the programmes weve developed and how we are measuring outcomes. See Canvas Resources section.', 'A platform that allows us to store and track data, but that is also user-friendly for people with disabilities.', '2024-08-01','7','pending','3','43', 'false', '2025-10-01', 'john', 'john@gmail.com', '2024-08-21'),
    ('Crowd Estimating Tool ','This project would allow a set of "problems" to be created (describing what should be estimated; each with an owner and a direct access URL) and then each problem should be allocated to a small collection of informed people. There should be room for the problem owner to provide descriptive text and append files to the problem. Each informed person should be asked to provide sequentially a 3 point estimate (guided to be in order a worst case, most likely and best case) for each problem they are allocated to. The owner should be able to set a multiplier for each problem, which might be millions of dollars or % chance. The system should validate each input (for example ensuring
that for a % multiplier the input is between 0 and 100) and show the informed person how their input translates to a final
value (so if they type 75 and the multiplier is millions of dollars the system shows them that it understands them to mean
$75m. The system should store the input after validation.)
The system will need to lead the informed person through a short sequence of activities for each problem. It is likely that
the informed people will each be asked to answer many related problems (for example four three point estimates for
one cluster of problems, so it might be a candidate for gamification to retain their willingness to participate. There is a
quality metric called the Brier score that informed people might earn through their estimates (once actual outcomes
are known) which might form a basis for a league table. Problem responses will need to be stored in a database for
later retrieval- there could be a great many problems and responses over time.
The system should keep track of who has and has not yet responded so the problem owner can encourage
participation. The problem owner should also be able to see individual responses and exclude any that are extreme
outliers. When the problem owner is satisfied that there are enough responses to a problem they should be able to
request the system to aggregate the individual beta distributions for all the responses to that problem into a single
aggregate beta distribution which is the key output of the system. This should include the alpha and beta parameters
of the aggregate beta distribution and perhaps also a nice graph.
The system will need to','1', NULL, 'Some understanding of descriptive statistics would be useful- its not very complex computation though', NULL, NULL, NULL, '2024-08-01','3','pending','3','43', 'false', '2025-12-01', 'john', 'john@gmail.com', '2023-09-13'),
('CARE Web Platform: Advancing Wildlife Conservation through AI-Driven Animal Re-Identification','1. User-Friendly Interface: The platform should offer an intuitive, easy-to-navigate interface that allows users to
effortlessly upload wildlife images, input relevant data, and access identification results.
2. Analytics and Reporting Tools: The platform should include comprehensive analytics and reporting capabilities,
allowing users to track re-identification rates, population trends, and other vital conservation metrics.
3. Collaborative Features: Facilities for sharing data and results among conservationists, researchers, and organizations
should be integrated to foster collaboration and knowledge exchange within the wildlife conservation community.','1', NULL, 'Creating a standalone Python application requires proficiency in Python programming, GUI development with
frameworks like Tkinter or PyQt, and project structuring.
You need to manage dependencies, package the application using tools like PyInstaller, and ensure cross-platform
compatibility.
Skills in testing, debugging, version control, and writing documentation are essential.
Additional knowledge in networking, UX design, and database management can be beneficial for more complex
applications.', NULL, 'AI Expertise and Support: Our project benefits from the dedicated support of a senior PhD student with a deep specialization in artificial
intelligence, particularly in vision-language models and machine-learning techniques relevant to our CARE framework. This expert resource
brings advanced theoretical knowledge and practical experience in AI, ensuring the seamless integration and optimization of the AI
components within our web platform. Their role includes guiding the AI strategy, assisting with complex AI challenges, and providing insights
into the latest research advancements to keep our project at the forefront of technology.', NULL, '2024-08-01','1','rejected','3','43', 'false', '2026-09-01', 'john', 'john@gmail.com', '2024-08-14'),
('WeDo','An app enabling people to connect based around a sport, hobby or activity. WeDo will let users post an activity e.g. tennis, gaming, walking
,running, meditating etc. and other users will be able to join in if theyre interested.
A simple yet powerful way to help people socialize and have fun.
This is a much more informal and powerful version of the website "Meetup". With WeDo, activities can be posted on short notice and users will
have better control over the types of participants they interact with.
WeDo will also give users the power to set preference such as womens or mens only activities, age range of participants and locality.','1', NULL, NULL, NULL, 'Git repository with the project implemented by capstone students in the past
See Canvas Resources section.', 'The app must have the abilities for posting and viewing activities, messaging, profile creation, and joining an activity.', '2024-08-01','2','accepted','3','43', 'false', '2025-08-01', 'john', 'john@gmail.com', '2021-11-27'),
('Dance Competition & Registration Event App','Create a front end app viewable from phone & PC for a google sheet backend, similar to glideapps, but without the requirement for drag
and drop UI editor that glide provides.
We currently have 2 apps - 1 for the registration into a competition and one for the competition itself. From these 2 template apps we make
separate instances of these apps, and link to a unique google sheet per competition. Currently these are separate apps, but could equally
be controlled via one app with separate data dependent on the chosen app from a landing page.
Some requirements:
- Able to Clone the app and attach to a different google sheet.
(We currently have around 150 active apps (each with their own google sheet))
- Ability for us to make modifications to the app(s)
- User Login (Does not necessarily need to be authenticated, just some way to differentiate what access people have.
Could potentially provide people with a generated password/pin and could be global across all apps
Currently authenticated via sending a pin to an entered email address. We have issues with people not getting pins etc at the moment... so
would be ideal to have some other solution for this.
Needs to have visibility of certain items based on this user logon.)
- Hosting
What is involved / required..
Idea of ongoing costs etc
Cloud based?
- App Scaling
- Mobile phone / tablet friendly
Most users are phone based... but some are PC / tablet
- Save App to Phone Home Screen with Defined Icon per app.
- Ability for us to see what a logged in user would see (ie use the app as if you were logged in as a particular user)','1', NULL, NULL, NULL, 'Access to copy of current app (currently using glideapps)
Access to google sheet (backend of app)', 'Features:
- Ability to display list(s) of data, with details of items.
- Filtering list based on user logged in
- Filtering list based on settings / data values
- Ability to relate data between google sheet tabs.
- Ability to upload files (mainly music files, but also others)
- Not sure where these would be uploaded to.
(Currently go into Glide (and I download into google drive via a google sheet script). Could go directly to google
drive? Or some cloud storage.)
- Ability to modify values, text, checkboxes of data in google sheet.
- Clickable Links - Download files, link to web addresses, etc
- Visibility expressions - User based, google sheet data based, eg settings.
- Text Display (with CSS styling to differentiate colors etc)
- Buttons to perform actions (with CSS styling to differentiate colors etc)
- Date Input - From Calendar Selector
- Choice Selections - From List from google sheet with filtered list options.
- User Initiated data refresh (would be nice to have) - for example refreshing stripe payment link (as below).
- In App Media player (music) - Not a definite requirement (can just provide a download link)
Would be good to have notifications also, but not sure this is possible with HTML apps yet', '2024-08-01','2','accepted','3','43', 'false', '2025-08-01', 'john', 'john@gmail.com', '2022-01-15');


INSERT INTO PREFERENCE
    (team_id, project_id, preference)
VALUES
    (1, 4, 1),
    (1, 3, 2),
    (1, 7, 3),
    (1, 9, 4),
    (1, 10, 5),
    (2, 2, 1),
    (2, 8, 2),
    (2, 6, 3),
    (2, 5, 4),
    (2, 3, 5),
    (3, 7, 1),
    (3, 3, 2),
    (3, 1, 3),
    (3, 4, 4),
    (3, 5, 5),
    (4, 8, 1),
    (4, 1, 2),
    (4, 4, 3),
    (4, 2, 4),
    (4, 6, 5),
    (5, 9, 1),
    (5, 10, 2),
    (5, 5, 3),
    (5, 8, 4),
    (5, 1, 5),
    (6, 3, 1),
    (6, 5, 2),
    (6, 9, 3),
    (6, 7, 4),
    (6, 6, 5);

INSERT INTO SEMESTER 
    (start_date, end_date, start_bidding_date, end_bidding_date, is_semester_one) 
VALUES
    (STR_TO_DATE('02-26-2026','%m-%d-%Y'), STR_TO_DATE('06-24-2026','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true),
    (STR_TO_DATE('02-26-2025','%m-%d-%Y'), STR_TO_DATE('06-24-2025','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true), 
    (STR_TO_DATE('07-15-2025','%m-%d-%Y'), STR_TO_DATE('11-11-2025','%m-%d-%Y'), ('2025-02-16 00:00:00'), ('2025-06-30 00:00:00'), false),
    (STR_TO_DATE('02-26-2024','%m-%d-%Y'), STR_TO_DATE('06-24-2024','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true), 
    (STR_TO_DATE('07-15-2024','%m-%d-%Y'), STR_TO_DATE('11-11-2024','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), false),
    (STR_TO_DATE('02-26-2023','%m-%d-%Y'), STR_TO_DATE('06-24-2023','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true), 
    (STR_TO_DATE('07-15-2023','%m-%d-%Y'), STR_TO_DATE('11-11-2023','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), false);

INSERT INTO USER  
    (role, email, password, first_name, last_name, team_id, company)
VALUES 
    ('student', 'student@gmail.com', '$2b$10$NV6/DbSVhVwXwuT2uu1vmO4IaGYKvrn6/thoHnPAgmSM/WrwZWqam', 'fname1', 'lname1', 1, NULL),
    ('admin', 'admin@gmail.com', '$2b$10$l8GwZZ3c/PB2Oq2m82RdT.jdUJXVgrvUBxTV3pxF3WzZriEWPms2.', 'fname2', 'lname2', NULL, NULL),
    ('client', 'client@gmail.com', '$2b$10$OjWuGKeyNJC/i8yQcxLHluifVPtJ4siHIp.VYRSkR5g5iWrCcbOCe', 'fname3', 'lname3', NULL, 'testcompany');
