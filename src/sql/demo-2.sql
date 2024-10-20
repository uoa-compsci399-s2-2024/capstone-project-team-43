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
    (3, 1, 1),
    (3, 10, 2),
    (3, 12, 3),
    (3, 8, 4),
    (3, 14, 5),
    (4, 0, 1),
    (4, 3, 2),
    (4, 9, 3),
    (4, 7, 4),
    (4, 16, 5),
    (5, 5, 1),
    (5, 6, 2),
    (5, 14, 3),
    (5, 13, 4),
    (5, 17, 5),
    (6, 8, 1),
    (6, 9, 2),
    (6, 15, 3),
    (6, 6, 4),
    (6, 12, 5),
    (7, 1, 1),
    (7, 19, 2),
    (7, 11, 3),
    (7, 4, 4),
    (7, 5, 5),
    (8, 0, 1),
    (8, 2, 2),
    (8, 14, 3),
    (8, 3, 4),
    (8, 9, 5),
    (9, 6, 1),
    (9, 13, 2),
    (9, 19, 3),
    (9, 7, 4),
    (9, 5, 5),
    (10, 4, 1),
    (10, 16, 2),
    (10, 18, 3),
    (10, 2, 4),
    (10, 9, 5),
    (11, 12, 1),
    (11, 13, 2),
    (11, 11, 3),
    (11, 1, 4),
    (11, 10, 5),
    (12, 0, 1),
    (12, 19, 2),
    (12, 7, 3),
    (12, 14, 4),
    (12, 15, 5),
    (13, 1, 1),
    (13, 17, 2),
    (13, 16, 3),
    (13, 12, 4),
    (13, 10, 5),
    (14, 3, 1),
    (14, 2, 2),
    (14, 8, 3),
    (14, 18, 4),
    (14, 6, 5),
    (15, 19, 1),
    (15, 5, 2),
    (15, 9, 3);
INSERT INTO SEMESTER 
    (start_date, end_date, start_bidding_date, end_bidding_date, is_semester_one) 
VALUES
    (STR_TO_DATE('02-26-2024','%m-%d-%Y'), STR_TO_DATE('06-24-2024','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true);
INSERT INTO PROJECT (title, description, owner_id, other_client_details, preferred_skills, 
special_requirements, available_resources, deliverable, created, semester_id, status, 
max_teams, project_number, published, expiry, client_name, client_email)
VALUES
('Performance Vision App', 'This multi-part project is a rework of an existing native app (originally designed in GDevelop) to make V2.0 multiplatform
compatible for Android, iOS and Windows.
This app consists of multiple games used in optometry for vision training (specifically sports vision training).
Students can choose the game-engine of their choice (e.g Unity or React).', NULL, NULL, 'JS, HTML, Google Firebase, Game Dev (Unity/ React or similar)', NULL, 'Available resources: https://performancevision.co.nz/', 'App package suitable for uploading to both Apple App Store and Google Play Store', NULL, 1, 'accepted', NULL, 0, NULL, '1/08/2024', 'Alex Jones', 'alex.jones@example.com'),
('Development of a python graphical user interface to our data
acquisition software PLACE', 'What started as a computer science graduation project, has grown into open source data acquisition software for our physics
lab. Many labs are slaves to the peculiarities of LabView, while our laser ultrasonics lab in the Physics department lives a happy,
license free, existence thanks to previous computer science students.
This software package called PLACE is python-based, communicating with all our hardware through pyserial. The current version
is mostly the work of previous Auckland computer science student Paul Freeman. The only component of the browser-based
data acquisition that is not in python is the graphical user interface.
In this project, we will take the final step in the main development of PLACE and create a python graphical user interface.', NULL, NULL, 'Good understanding of python is mandatory, while an interest in hardware and physics are a definite plus', NULL, 'Available resources: https://github.com/PALab/place', 'The desired outputs include an investigation in the best options for a python graphical user interface, a small scale demo of an experiment in PLACE run with the new python GUI, and finally inclusion of the python GUI in our PLACE code on GitHub.', NULL, 1, 'accepted', NULL, 0, NULL, '1/08/2024', 'Emily Smith', 'emily.smith@fakeemail.com'),
('Chatbots as Interactive Storytellers', 'Storytelling and dialogue have long been an area of interest in Cognitive Computer Science, but strongly limited by the lack of novelty and
imagination that a hard-coded system can display.
This project aims to explore the potential of generative LLMs (ChatGPT) for creating fun and novel storytelling controlled by prompts from an
underlying dungeon master program. Students will work on developing a consistent and robust storytelling engine to track characters,
intentions and world-state. Then, they will utilise the ChatGPT API for fresh ideas, and to transform the data representations within the engine
into engaging human-readable text, resulting in a Choose-Your-Own-Adventure-style narrative.
Depending on progress, next steps would include looking into the quality of storytelling, through elements such as pacing, problem-andresolution cycles and character development; and potentially building a UI for better user experience.', NULL, NULL, NULL, NULL, NULL, 'An MVP would look like a basic engine to control things such as character status, inventory and location, as well as a
successfully integrated chatbot to provide a scene and a set of reasonable interactive choices for the reader to make.
If the choices and story are consistent, I will consider the MVP to be met.', NULL, 1, 'accepted', NULL, 0, NULL, '1/08/2024', 'John Doe', 'john.doe@mydomain.com'),
('Te Tuhi Disability Training Cafe platform for trainees', 'The Behaviour Analysis Programme at the university specialises in partnering with organisations who support people with disabilities (including
dementia, brain injury, and intellectual disabilities).
One of our ongoing projects is the Te Tuhi cafe for training people with disabilities (https://www.times.co.nz/news/cooking-up-opportunitynew-training-cafe-at-te-tuhi/; https://tetuhi.art/about/te-tuhi-cafe/). The next step in our project is to create an electronic platform on which
to store data, track a trainee''s progress, and create a one-stop-shop for all the programmes in the project.
We would love to collaborate to develop this - it''s outside our expertise!', NULL, NULL, NULL, NULL, 'See Canvas Resources section. We could also take students to the cafe to meet the team and see how it operates. We have a number of documents that we can share
that explain the programmes we''ve developed and how we are measuring outcomes.', 'A platform that allows us to store and track data, but that is also user-friendly for people with disabilities', NULL, 1, 'accepted', NULL, 0, NULL, '1/08/2024', 'Sarah Connor', 'sarah.connor@randommail.com'),
('Real-time EEG analysis program', 'The electroencephalogram (EEG) measures the electrical signals of the brain. These are hard to interpret physiological signals. Hence, further
quantitative analysis is needed to elucidate subtle changes.
In my work, I use EEG to measure changes during extreme physiological interventions, like severe hypoxia (shortage of oxygen), hypercapnia
(too much carbon dioxide) or nitrogen narcosis (during diving). Currently, the quantitative analysis is done after the measurement to find out
what happened in the brain.
The project''s aim would be to create a program that captures the signals of the EEG device, annotates events, detects and visualizes
artifacts in the signals (based on code snippets that will be provided), and run quantitative EEG analysis scripts (again will be provided) that
are subsequently visualized with changes over time. All data (raw and processed) need to be stored for future analysis and interpretation.', NULL, NULL, 'Hardware interaction, real-time engines, accurate data processing', NULL, 'There is an EEG device available that can be used to program the interaction with the software. This device is also used occasionally for research, so it is not full-time available. Additionally, there will be a tour for the student group showing the lab where the device is used. If the software is successful, it can be trialled in the lab.', 'Program that captures the signals of the EEG device, annotate events, detects and visualizes artifacts in the signals
(based on code snippets that will be provided), and run quantitative EEG analysis scripts (again will be provided) that
are subsequently visualized with changes over time. All data (raw and processed) need to be stored for future analysis
and interpretation.', NULL, 1, 'accepted', NULL, 0, NULL, '1/08/2024', 'David Lee', 'david.lee@fakemail.net'),
('Gamification of Sustainable Transition Pathways', 'We are interested in having a ''candy-land'' style game developed, to help us communicate our research findings to managers and
implement them in practice. The goal is to help managers understand differences in sustainability initiatives that can be implemented in their
firms and how to build sustainable transition pathways (to make their business models more sustainable). This would require the ''game'' to
allow for an initial collection of data on firms, and their current sustainability initiatives, and then allow them to select ''new'' potential initiatives
to implement and see how they interact.
This would lead to their path progressing (new squares appearing), sliding backwards, getting stuck in a loop, etc. The ''game'' would need to
be editable in the future, so we can alter links between various sustainability initiatives (recycling, paying above a living wage, etc.), add
additional initiatives, etc. as we discover them in the data. ', NULL, NULL, NULL, NULL, NULL, 'A ''game'' version that allows for different pathways, something interactive and professional-looking. It would be ideal if it
could be a webpage itself or, second best, exist on a webpage. It needs to be editable in the future so that we can
change links between variables as we discover them. It would need to be able to handle lots of different ''paths'' as no
two companies are the same, and there will be lots of combinations of initiatives (but something basic should still work,
just needs to be able to handle random combinations).
Likely two avatars - one is the ''game'' that asks the questions and makes statements (maybe a kiwi?) and the other
would be the ''player'' (a managerial-looking individual).
An ability to store data (firm size, type, current initiatives) and the ''potential path'' they build as well as the email so that
we may be able to send future communications (if they opt-in). Keeping the data at a minimum would help us get an
index of what firms are currently doing and their current paths.', NULL, 2, 'accepted', NULL, 1, NULL, NULL, 'Laura Miller', 'laura.miller@testemail.com'),
('Alcohol, drug use and mental illness during pregnancy', 'Methamphetamine (METH), cannabis and other recreational drug use during pregnancy has increased in NZ and worldwide (1, 2). Multiple
drug use, comorbid psychiatric disorders, and domestic violence are common in women who report using METH, alcohol and other drugs
during pregnancy (3, 4). Alcohol and drugs consumed during pregnancy cross the placenta and depending on the drug, the timing, and
frequency of use may damage the brain and other organs of the developing fetus. Cannabis, opioids and stimulants such as METH are
associated with preterm birth, low birthweight, neurobehavioral disturbance at birth, developmental delays and behaviour problems in
childhood (1-3, 5-10). The aim of this project is to provide an interactive website that will allow individuals who use it to get information about
the impact of substance use and mental illness during pregnancy on the developing child.', NULL, NULL, 'Interactive website development, Māor', NULL, NULL, 'This project is the first step in developing an interactive website that can do the following: 1.Allow individuals to use a
standardised screener to test whether they have an alcohol or drug problem and link to information about what that
might mean for their the mother''s health and the baby''s development. 2.Allow individuals to use a standardised
screener to test whether they have a mental health problem and link to what that might mean for the mother''s health
and the baby''s development. 3.Provide links to resources, self-help websites or places where they can get help.
4.Develop the website so it can toggle between English and Māori.', NULL, 2, 'accepted', NULL, 2, NULL, NULL, 'Michael Clark', 'michael.clark@sampledomain.org'),
('CARE Web Platform: Advancing Wildlife Conservation through
AI-Driven Animal Re-Identification', 'The CARE Web Platform is an innovative online system designed to revolutionize wildlife conservation efforts through advanced AI-driven
animal re-identification technology. At its core, the platform utilizes the Clip-based Animal REidentification (CARE) framework, which
harnesses the power of vision-language models, specifically CLIP, to accurately identify individual animals in diverse wildlife populations. By
generating conditional text tokens for each image, CARE enables a more nuanced and scalable approach to monitoring wildlife,
overcoming the limitations of traditional tagging methods. The web platform offers an intuitive interface for researchers and conservationists
to upload, analyze, and track wildlife images, facilitating real-time data collection and analysis. Our pilot study on stoat re-identification in
New Zealand''s Waiheke Island, along with validations across multiple animal benchmarks, underscores the platform''s potential to significantly
enhance global wildlife conservation strategies.', NULL, NULL, 'Creating a standalone Python application requires proficiency in Python programming, GUI development with
frameworks like Tkinter or PyQt, and project structuring.
You need to manage dependencies, package the application using tools like PyInstaller, and ensure cross-platform
compatibility.
Skills in testing, debugging, version control, and writing documentation are essential.
Additional knowledge in networking, UX design, and database management can be beneficial for more complex
applications.', NULL, 'AI Expertise and Support: Our project benefits from the dedicated support of a senior PhD student with a deep specialization in artificial
intelligence, particularly in vision-language models and machine-learning techniques relevant to our CARE framework. This expert resource
brings advanced theoretical knowledge and practical experience in AI, ensuring the seamless integration and optimization of the AI
components within our web platform. Their role includes guiding the AI strategy, assisting with complex AI challenges, and providing insights
into the latest research advancements to keep our project at the forefront of technology.', '1. User-Friendly Interface: The platform should offer an intuitive, easy-to-navigate interface that allows users to
effortlessly upload wildlife images, input relevant data, and access identification results.
2. Analytics and Reporting Tools: The platform should include comprehensive analytics and reporting capabilities,
allowing users to track re-identification rates, population trends, and other vital conservation metrics.
3. Collaborative Features: Facilities for sharing data and results among conservationists, researchers, and organizations
should be integrated to foster collaboration and knowledge exchange within the wildlife conservation community.', NULL, 2, 'accepted', NULL, 3, NULL, NULL, 'Olivia Martin', 'olivia.martin@mockmail.com'),
('Performance enhancement of a Julia Monte Carlo code for
melting simulations', 'In our research group we develop Monte Carlo methods to describe melting processes. Recently, we developed a Monte Carlo package
ParallelTemperingMonteCarlo.jl in the modern programming language Julia, based on our melting codes originally developed in Fortran90.
The main aim of this re-writing was to generate one unified code that uses the multiple-dispatch feature of Julia to enable the simulation of
very different physical systems. Another advantage of Julia is that it allows for simple-to-read code similar to Python while allowing to achieve
high performance similar to Fortran/C codes due to its just-in-time compiler. Nevertheless, it is not necessarily straightforward how to optimise
the code''s performance.
This project would investigate speeding up the serial version of our Monte Carlo code using profiling features of Julia and improve testing and
documentation of our MC library. A plus would be preparing the code for parallelisation (via threading or MPI) with the aim to run simulations
on the New Zealand e-science infrastructure (NeSi) supercomputers.', NULL, NULL, 'Needed skills can be acquired during the project; any prior experience with GitHub, Visual Studio Code, Julia
programming language or supercomputers is helpful but not a prerequisite', NULL, 'Julia documentation: https://docs.julialang.org/en/v1/
Julia tutorials: https://julialang.org/learning/tutorials/
Monte Carlo melting code: https://github.com/ElkePahl/ParallelTemperingMonteCarlo.jl', 'Performance improvement of our Julia code (serial version) to achieve comparable efficiency as we had for the
Fortran version. A plus would be to have a parallel version of the code that runs on NeSI''s supercomputer.', NULL, 2, 'accepted', NULL, 4, NULL, NULL, 'James Brown', 'james.brown@nowhere.com'),
('Low / non-profit dating app that maximizes usefulness', 'Dating apps these days confine users to overpriced paywalls, mindless swiping and algorithms that discriminate and game the app towards
addiction rather than actually maximizing the odds of finding a suitor.
The world needs a dating app that it is not controlled by a greedy monopoly. It puts transparency, fairness, and real connection above
profits.', NULL, NULL, 'react native / expo', NULL, NULL, 'having no paywalls
-algorithms that don''t discriminate and give max chance of matching (every like and person is visible within a users
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
-Any other features you think will help people find a match.', NULL, 2, 'accepted', NULL, 5, NULL, NULL, 'Sophia Davis', 'sophia.davis@tempemail.net'),
('WeDo', 'An app enabling people to connect based around a sport, hobby or activity. WeDo will let users post an activity e.g. tennis, gaming, walking
,running, meditating etc. and other users will be able to join in if they''re interested.
A simple yet powerful way to help people socialize and have fun.
This is a much more informal and powerful version of the website "Meetup". With WeDo, activities can be posted on short notice and users will
have better control over the types of participants they interact with.

WeDo will also give users the power to set preference such as women’s or men’s only activities, age range of participants and locality. ', NULL, NULL, NULL, NULL, 'Git repository with the project implemented by capstone students in the past', NULL, NULL, 2, 'accepted', NULL, 6, NULL, NULL, 'William Johnson', 'william.johnson@dummyemail.org'),
('Dance Competition & Registration Event App', 'Create a front end app viewable from phone & PC for a google sheet backend, similar to glideapps, but without the requirement for drag
and drop UI editor that glide provides.', NULL, NULL, NULL, NULL, 'Access to copy of current app (currently using glideapps)
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
Would be good to have notifications also, but not sure this is possible with HTML apps yet.', NULL, 2, 'accepted', NULL, 7, NULL, NULL, 'Mia Wilson', 'mia.wilson@fakemail.com'),
('Taiaho Observatory Operations Dashboard', 'The University of Auckland has developed a prototype ground station called the Taiaho Observatory. Taiaho is currently capable of tracking
satellites for the purpose of communications and space situational awareness. To expand the capabilities of this observatory, we are tasking
a student with designing and developing a unified dashboard to present important operational information and control key systems. The
student will have the opportunity of collaborating with the DLR for this project.', NULL, NULL, 'Computer Science, Computer Systems Engineering, Software Engineering
Front End Development, UX Development, Web Development, Network Engineering, Systems Engineering', NULL, 'Examples, Existing Solutions, Near-Solutions, etc.:
Op-Ed via Medium regarding Mission Control Software UI for Satellite Constellations. Contains quality graphics and analysis.
https://micahtinklepaugh.medium.com/towards-holograms-in-space-87b32215bf82
Stock Image of futuristic mission control.
https://www.istockphoto.com/vector/futuristic-dashboard-hud-interface-future-frame-hologram-ui-infographic-interactive-gm1334539615-
416625136
Op-Ed via Medium regarding recreating the SpaceX dashboard UI.
https://uxdesign.cc/how-i-recreated-crew-dragons-ui-15877eddf3ed', 'Design a visually pleasing Graphical User Interface for the dashboard. (Front-end).
Liaise with the current FSOC team to design a sensible data solution that integrates with existing network infrastructure.
(Back-end).
Liaise with the current FSOC team and the DLR to integrate existing control systems into the dashboard.
Maintain a mindful approach towards cyber security. ', NULL, 2, 'accepted', NULL, 8, NULL, NULL, 'Benjamin Moore', 'benjamin.moore@randomnet.com'),
('Connecting neurodivergent students at UoA', 'Context and rationale:
Inclusive Learning supports neurodivergent students with their academic and learning needs. As well as navigating the academic demands
of tertiary study, many of these students report feeling isolated and disconnected from others; they would like to meet other students within
their courses or related areas of study, and those with similar personal interests.
Moreover, neurodivergent students often feel more comfortable connecting with other neurodivergent students as they have a mutual
understanding of some of the challenges at university and can share their experiences, skills and achievements to support each other.
We would like the project team to create a platform that enables neurodivergent students to connect with other neurodivergent students.', NULL, NULL, 'Some basic understanding of neurodiversity and how this might impact user experience would be preferred but not
essential.', NULL, 'Link to the Inclusive Learning website and services we offer: https://www.auckland.ac.nz/en/students/student-support/academicsupport/inclusive-learning.html
Info about neurodivergence to assist in creating a positive user experience - can be shared on request', 'A user-friendly, safe, accessible and flexible platform (e.g. web-based and/or mobile app) in which neurodivergent
students could connect with other neurodivergent students. The students would create a user profile by entering
(optional) personal information (e.g. profile picture, identifying info (name, age, gender, ethnicity), degree
programme, neurodivergence, past courses, current courses, interests, specific skills and knowledge, what they like to
do in their spare time etc).
The platform would allow students to be matched according to various profile information (e.g. taking the same
course, taken the course in the past, similar interests, looking to learn and skill or offering to share/teach a skill). ', NULL, 2, 'accepted', NULL, 9, NULL, NULL, 'Chloe Harris', 'chloe.harris@testdomain.com'),
('Sorting out basic chemical ideas', 'Fundamental chemical concepts (e.g., molecules, elements, compounds, atoms, state of matter, and the relationships among these
concepts) are known to be challenging to learn by early senior science students. Very often, students would have to learn a string of
definitions that are abstract and not easy to visualise. I''ve been trying to use a visual method to help students learn (and teachers teach). I
have a stack of diagrams that represent some substances at the particle level, and thought we could develop a web-based app/desktop
app in which students could (i) sort the diagrams, (ii) give reasons for their sorting, so that the app could (i) give feedback to their sorting,
and (ii) introduce those chemical concepts through examples that are illustrated in those diagrams. Ideally, we could develop some
interactive assessment tasks for users', NULL, NULL, 'Not particularly in terms of technology. As the product will be used by school students taking science/chemistry, the
team would need to develop an appealing interface. Some understanding of school chemistry would be helpful.', NULL, '5 publications on common mistakes that school students make when they learn basic chemical ideas. The publications will help the team
to appreciate how users may sort the diagrams. ', 'The project would
(1) collect information about how users sort the diagrams and what reasons they give for the sorting.
(2) track the time that users spend on each sorting.
(3) give verbal feedback on the way users sort, and where appropriate, conceptualise their sorting in terms of those
chemical concepts (e.g., when a user puts diagrams representing oxygen, chlorine, mercury in one group, and water,
carbon dioxide, carbon monoxide in another group, the feedback would help the user to learn they are ''elements'' and
''compounds'' respectively). ', NULL, 2, 'accepted', NULL, 10, NULL, NULL, 'Ethan Jackson', 'ethan.jackson@mockmail.net');
