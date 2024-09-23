CREATE TABLE PROJECT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    deliverable VARCHAR(255),
    description VARCHAR(255) NOT NULL,
    owner_id INTEGER NOT NULL,
    preferred_skills VARCHAR(255),
    special_requirements VARCHAR(255),
    available_resources VARCHAR(255),
    created DATE NOT NULL,
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
    start_bidding_date DATE NOT NULL,
    end_bidding_date DATE NOT NULL,
    is_semester_one BOOL NOT NULL,
    status ENUM('retired', 'current', 'upcoming')
);

CREATE TABLE TEAM (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_number INT NOT NULL, 
    team_name VARCHAR(255),
    semester_id INT NOT NULL, 
    project_id INT
);


INSERT INTO PROJECT 
    (title, description, owner_id, preferred_skills, special_requirements, available_resources, deliverable, created, semester_id, status, max_teams, project_number, published) 
VALUES 
    ('testproj1','An amazing web solution!','1', NULL, NULL, NULL, NULL, '2024-08-01','1','accepted','3','43', 'false'),
    ('testproj2','A bad web solution!','1', NULL, NULL, NULL, NULL, '2024-08-01','1','rejected','3','43', 'false'),
    ('testproj3','Maybe an amazing web solution!','1', NULL, NULL, NULL, NULL, '2024-08-01','1','pending','3','43', 'false');

INSERT INTO USER  (role, email, password, first_name, last_name, team_id, company)
VALUES 
    ('student', 'student@gmail.com', NULL, 'fname1', 'lname1', 1, NULL),
    ('admin', 'admin@gmail.com', NULL, 'fname2', 'lname2', NULL, NULL),
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
    (STR_TO_DATE('02-26-2025','%m-%d-%Y'), STR_TO_DATE('06-24-2025','%m-%d-%Y'), STR_TO_DATE('02-28-2025','%m-%d-%Y'), STR_TO_DATE('06-30-2025','%m-%d-%Y'), true), 
    (STR_TO_DATE('07-15-2025','%m-%d-%Y'), STR_TO_DATE('11-11-2025','%m-%d-%Y'), STR_TO_DATE('02-16-2025','%m-%d-%Y'), STR_TO_DATE('06-18-2025','%m-%d-%Y'), false),
    (STR_TO_DATE('02-26-2024','%m-%d-%Y'), STR_TO_DATE('06-24-2024','%m-%d-%Y'), STR_TO_DATE('02-28-2025','%m-%d-%Y'), STR_TO_DATE('06-30-2025','%m-%d-%Y'), true), 
    (STR_TO_DATE('07-15-2024','%m-%d-%Y'), STR_TO_DATE('11-11-2024','%m-%d-%Y'), STR_TO_DATE('02-28-2025','%m-%d-%Y'), STR_TO_DATE('06-30-2025','%m-%d-%Y'), false),
    (STR_TO_DATE('02-26-2023','%m-%d-%Y'), STR_TO_DATE('06-24-2023','%m-%d-%Y'), STR_TO_DATE('02-28-2025','%m-%d-%Y'), STR_TO_DATE('06-30-2025','%m-%d-%Y'), true), 
    (STR_TO_DATE('07-15-2023','%m-%d-%Y'), STR_TO_DATE('11-11-2023','%m-%d-%Y'), STR_TO_DATE('02-28-2025','%m-%d-%Y'), STR_TO_DATE('06-30-2025','%m-%d-%Y'), false);