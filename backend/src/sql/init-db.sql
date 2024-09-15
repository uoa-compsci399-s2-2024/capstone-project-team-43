CREATE TABLE PROJECT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    deliverable VARCHAR(255),
    description VARCHAR(255) NOT NULL,
    owner_id INTEGER NOT NULL,
    preferred_skills VARCHAR(255),
    created DATE NOT NULL,
    semester_id INTEGER NOT NULL,
    status ENUM('rejected', 'accepted', 'pending') NOT NULL,
    max_teams INTEGER NOT NULL
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

-- CREATE TABLE USER_GROUP (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INTEGER NOT NULL,
--     group_id INTEGER NOT NULL
-- );

-- CREATE TABLE PROJECT_TEAM (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     project_id INTEGER NOT NULL,
--     team_id INTEGER NOT NULL,
--     -- created DATE NOT NULL 
-- );

CREATE TABLE SEMESTER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_semester_one BOOL NOT NULL
);

CREATE TABLE TEAM (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_number INT NOT NULL, 
    team_name VARCHAR(255),
    semester_id INT NOT NULL, 
    project_id INT
);

-- undecided on if we need the below views 

-- CREATE VIEW CLIENTS AS
-- SELECT *
-- FROM USER
-- WHERE role = 'client';

-- CREATE VIEW ADMINS AS
-- SELECT *
-- FROM USER
-- WHERE role = 'admin';

-- CREATE VIEW STUDENTS AS
-- SELECT *
-- FROM USER
-- WHERE role = 'student';

INSERT INTO PROJECT 
    (title, description, owner_id, preferred_skills, deliverable, created, semester_id, status, max_teams, project_number) 
VALUES 
    ('testproj1','An amazing web solution!','0', NULL, NULL, '2024-08-01','1','accepted','3','43'),
    ('testproj2','A bad web solution!','0', NULL, NULL, '2024-08-01','1','rejected','3','43'),
    ('testproj3','Maybe an amazing web solution!','0', NULL, NULL, '2024-08-01','1','pending','3','43');

INSERT INTO USER  (role, email, password, first_name, last_name, team_id, company)
VALUES 
    ('student', 'test1@gmail.com', '12345', 'fname1', 'lname1', 1, NULL),
    ('admin', 'test2@gmail.com', '12345', 'fname2', 'lname2', NULL, NULL),
    ('client', 'test3@gmail.com', '12345', 'fname3', 'lname3', NULL, 'testcompany');

INSERT INTO TEAM 
    (team_number, team_name, semester_id)
VALUES 
    (1, 'testteam1', 1),
    (2, 'testteam2', 1),
    (3, 'testteam3', 2),
    (4, 'testteam4', 2);

INSERT INTO SEMESTER 
    (start_date, end_date, is_semester_one) 
VALUES 
    (STR_TO_DATE('02-26-2024','%m-%d-%Y'), STR_TO_DATE('06-24-2024','%m-%d-%Y'), true), 
    (STR_TO_DATE('07-15-2024','%m-%d-%Y'), STR_TO_DATE('11-11-2024','%m-%d-%Y'), false);