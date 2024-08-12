CREATE TABLE PROJECT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    owner INTEGER NOT NULL,
    preferred_skills VARCHAR(255),
    project_deliverable VARCHAR(255),
    created DATE NOT NULL,
    semester_id INTEGER NOT NULL,
    status ENUM('rejected', 'accepted', 'pending') NOT NULL,
    max_num_of_groups INTEGER NOT NULL,
    project_num INTEGER NOT NULL
);

CREATE TABLE USER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('admin', 'student', 'client') NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    created DATETIME NOT NULL
);

CREATE TABLE USER_GROUP (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL
);

CREATE TABLE PROJECT_GROUP (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    created DATE NOT NULL
);

CREATE TABLE SEMESTER_DATES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    semester_one BOOL NOT NULL
);

INSERT INTO PROJECT (title, description, owner, preferred_skills, project_deliverable, created, semester_id, status, max_num_of_groups, project_num) 
VALUES ('cornerstone','An amazing web solution!','0', NULL, NULL, '2024-08-01','1','accepted','3','43');