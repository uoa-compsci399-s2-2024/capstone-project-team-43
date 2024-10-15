CREATE TABLE PROJECT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    other_client_details TEXT(4096),
    deliverable TEXT(4096),
    description TEXT(4096) NOT NULL,
    owner_id INTEGER NOT NULL,
    preferred_skills TEXT(4096),
    special_requirements TEXT(4096),
    available_resources TEXT(4096),
    created DATE NOT NULL,
    available_from DATETIME DEFAULT CURRENT_TIMESTAMP,
    expiry DATE NOT NULL,
    semester_id INTEGER NOT NULL,
    status ENUM('rejected', 'accepted', 'pending') NOT NULL,
    max_teams INTEGER NOT NULL,
    published ENUM('true', 'false') NOT NULL
);

CREATE TABLE USER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('admin', 'student', 'client') NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    team_id INT
);

CREATE TABLE SEMESTER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_bidding_date DATETIME NOT NULL,
    end_bidding_date DATETIME NOT NULL,
    is_semester_one BOOL NOT NULL,
    status ENUM('retired', 'current', 'upcoming'),
    name VARCHAR(255) DEFAULT NULL

);
-- trigger to fill value in name & status column of SEMESTER
CREATE TRIGGER before_insert_semester
BEFORE INSERT ON SEMESTER
FOR EACH ROW
BEGIN
    DECLARE semester_num VARCHAR(3);

    IF NEW.is_semester_one = 1 THEN
        SET semester_num = 'One';
    ELSE
        SET semester_num = 'Two';
    END IF;

    IF NEW.end_date < CURRENT_TIMESTAMP THEN
        SET NEW.status = 'retired';
    ELSEIF NEW.start_date > CURRENT_TIMESTAMP THEN
        SET NEW.status = 'upcoming';
    ELSE
        SET NEW.status = 'current';
    END IF;

    -- Set name as "Semester {1 or 2}, {start_date year}"
    SET NEW.name = CONCAT('Semester ', semester_num, ', ', YEAR(NEW.start_date));
END; 

CREATE TABLE TEAM (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_number INT NOT NULL, 
    team_name VARCHAR(255),
    semester_id INT NOT NULL, 
    project_id INT
);

CREATE TABLE PREFERENCE (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    project_id INT NOT NULL,
    preference INT NOT NULL,
    created TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(3)
);


INSERT INTO PROJECT 
    (title, description, owner_id, other_client_details, preferred_skills, special_requirements, available_resources, deliverable, created, semester_id, status, max_teams, project_number, published, expiry, client_name, client_email) 
VALUES 
    ('testproj1','An amazing web solution!','1', NULL, NULL, NULL, NULL, NULL, '2024-08-01','2','accepted','3','43', 'false', '2025-08-01', 'john', 'john@gmail.com'),
    ('testproj2','A bad web solution!','1', NULL, NULL, NULL, NULL, NULL, '2024-08-01','1','rejected','3','43', 'false', '2025-09-01', 'john', 'john@gmail.com'),
    ('testproj3','Maybe an amazing web solution!','6', NULL, NULL, 'Some knowledge on maths and stats would be good', NULL, NULL, '2024-08-01','4','pending','3','43', 'false', '2026-10-01', 'john', 'john@gmail.com'),
    ('Performance enhancement of a Julia Monte Carlo code for melting simulations','Performance improvement of our Julia code (serial version) to achieve comparable efficiency as we had for the
Fortran version. A plus would be to have a parallel version of the code that runs on NeSIs supercomputer','6', NULL, 'Needed skills can be acquired during the project; any prior experience with GitHub, Visual Studio Code, Julia
programming language or supercomputers is helpful but not a prerequisite', NULL, 'Julia documentation: https://docs.julialang.org/en/v1/
Julia tutorials: https://julialang.org/learning/tutorials/
Monte Carlo melting code: https://github.com/ElkePahl/ParallelTemperingMonteCarlo.jl', NULL, '2024-08-01','6','pending','3','43', 'false', '2026-10-01', 'john', 'john@gmail.com'),
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
The platform should have the functionality to automate (or eliminate) each step of the process.','1', NULL, 'JS, HTML, Google Firebase, Game Dev (Unity/ React or similar)', NULL, NULL, 'App package suitable for uploading to both Apple App Store and Google Play Store', '2024-08-01','1','accepted','3','43', 'false', '2026-08-01', 'john', 'john@gmail.com'),
    ('Chatbots as Interactive Storytellers','Storytelling and dialogue have long been an area of interest in Cognitive Computer Science, but strongly limited by the lack of novelty and imagination that a hard-coded system can display. This project aims to explore the potential of generative LLMs (ChatGPT) for creating fun and novel storytelling controlled by prompts from an underlying dungeon master program. Students will work on developing a consistent and robust storytelling engine to track characters, intentions and world-state. Then, they will utilise the ChatGPT API for fresh ideas, and to transform the data representations within the engine into engaging human-readable text, resulting in a Choose-Your-Own-Adventure-style narrative. Depending on progress, next steps would include looking into the quality of storytelling, through elements such as pacing, problem-and-resolution cycles and character development; and potentially building a UI for better user experience.','1', NULL, NULL, NULL, NULL, 'An MVP would look like a basic engine to control things such as character status, inventory and location, as well as a successfully integrated chatbot to provide a scene and a set of reasonable interactive choices for the reader to make. If the choices and story are consistent, I will consider the MVP to be met.', '2024-08-01','1','rejected','3','43', 'false', '2025-09-01', 'john', 'john@gmail.com'),
    ('Te Tuhi Disability Training Cafe platform for trainees','The Behaviour Analysis Programme at the university specialises in partnering with organisations who support people with disabilities (including dementia, brain injury, and intellectual disabilities). One of our ongoing projects is the Te Tuhi cafe for training people with disabilities (https://www.times.co.nz/news/cooking-up-opportunity- new-training-cafe-at-te-tuhi/; https://tetuhi.art/about/te-tuhi-cafe/). The next step in our project is to create an electronic platform on which to store data, track a trainees progress, and create a one-stop-shop for all the programmes in the project. We would love to collaborate to develop this - its outside our expertise!','1', NULL, NULL, NULL, 'We could also take students to the cafe to meet the team and see how it operates. We have a number of documents that we can share that explain the programmes weve developed and how we are measuring outcomes. See Canvas Resources section.', 'A platform that allows us to store and track data, but that is also user-friendly for people with disabilities.', '2024-08-01','7','pending','3','43', 'false', '2025-10-01', 'john', 'john@gmail.com'),
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
The system will need to','1', NULL, 'Some understanding of descriptive statistics would be useful- its not very complex computation though', 'Some compsci knowledge would be nice', NULL, NULL, '2024-08-01','3','pending','3','43', 'false', '2025-12-01', 'john', 'john@gmail.com'),
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
into the latest research advancements to keep our project at the forefront of technology.', NULL, '2024-08-01','1','rejected','3','43', 'false', '2026-09-01', 'john', 'john@gmail.com');
INSERT INTO USER  (role, email, password, first_name, last_name, team_id, company)
VALUES 
    ('student', 'student@gmail.com', '$2b$10$NV6/DbSVhVwXwuT2uu1vmO4IaGYKvrn6/thoHnPAgmSM/WrwZWqam', 'fname1', 'lname1', 1, NULL),
    ('admin', 'admin@gmail.com', '$2b$10$l8GwZZ3c/PB2Oq2m82RdT.jdUJXVgrvUBxTV3pxF3WzZriEWPms2.', 'fname2', 'lname2', NULL, NULL),
    ('client', 'client@gmail.com', '$2b$10$OjWuGKeyNJC/i8yQcxLHluifVPtJ4siHIp.VYRSkR5g5iWrCcbOCe', 'fname3', 'lname3', NULL, 'testcompany');
  
INSERT INTO TEAM 
    (team_number, team_name, semester_id)
VALUES 
    (1, 'testteam1', 1),
    (2, 'testteam2', 1),
    (3, 'testteam3', 2),
    (4, 'testteam4', 2);

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
    -- (STR_TO_DATE('02-26-2024','%m-%d-%Y'), STR_TO_DATE('06-24-2024','%m-%d-%Y'), true), 
    -- (STR_TO_DATE('07-15-2024','%m-%d-%Y'), STR_TO_DATE('11-11-2024','%m-%d-%Y'), false);

INSERT INTO PREFERENCE
    (team_id, project_id, preference)
VALUES
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3);
