CREATE TABLE PROJECT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    other_client_details VARCHAR(255),
    deliverable VARCHAR(255),
    description VARCHAR(255) NOT NULL,
    owner_id INTEGER NOT NULL,
    preferred_skills VARCHAR(255),
    special_requirements VARCHAR(255),
    available_resources VARCHAR(255),
    created DATE NOT NULL,
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


INSERT INTO PROJECT 
    (title, description, owner_id, other_client_details, preferred_skills, special_requirements, available_resources, deliverable, created, semester_id, status, max_teams, project_number, published, expiry, client_name, client_email) 
VALUES 
    ('testproj1','An amazing web solution!','1', NULL, NULL, NULL, NULL, NULL, '2024-08-01','1','accepted','3','43', 'false', '2025-08-01', 'john', 'john@gmail.com'),
    ('testproj2','A bad web solution!','1', NULL, NULL, NULL, NULL, NULL, '2024-08-01','1','rejected','3','43', 'false', '2025-09-01', 'john', 'john@gmail.com'),
    ('testproj3','Maybe an amazing web solution!','1', NULL, NULL, NULL, NULL, NULL, '2024-08-01','1','pending','3','43', 'false', '2025-10-01', 'john', 'john@gmail.com'),
    ('retiredproj1','A old web solution!','1', NULL, NULL, NULL, NULL, NULL, '2024-08-01','5','rejected','3','43', 'false', '2025-09-01', 'john', 'john@gmail.com'),
    ('retiredproj2','Maybe an older web solution!','1', NULL, NULL, NULL, NULL, NULL, '2024-08-01','6','pending','3','43', 'false', '2025-10-01', 'john', 'john@gmail.com');

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
    (STR_TO_DATE('02-26-2025','%m-%d-%Y'), STR_TO_DATE('06-24-2025','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true), 
    (STR_TO_DATE('07-15-2025','%m-%d-%Y'), STR_TO_DATE('11-11-2025','%m-%d-%Y'), ('2025-02-16 00:00:00'), ('2025-06-30 00:00:00'), false),
    (STR_TO_DATE('02-26-2024','%m-%d-%Y'), STR_TO_DATE('06-24-2024','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true), 
    (STR_TO_DATE('07-15-2024','%m-%d-%Y'), STR_TO_DATE('11-11-2024','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), false),
    (STR_TO_DATE('02-26-2023','%m-%d-%Y'), STR_TO_DATE('06-24-2023','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true), 
    (STR_TO_DATE('07-15-2023','%m-%d-%Y'), STR_TO_DATE('11-11-2023','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), false);