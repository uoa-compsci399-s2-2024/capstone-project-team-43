import random

TEAMS = 25
PROJECTS = 20
TEAMS_PER_PROJECT = 3

script = '''INSERT INTO TEAM
    (team_number, team_name, semester_id)
VALUES
'''

for i in range(TEAMS):
    if i == TEAMS - 1:
        script += f'    ({i+1}, \'team_{i+1}\', 1);\n\n'
    else:
        script += f'    ({i+1}, \'team_{i+1}\', 1),\n'

script += '''
INSERT INTO PROJECT
    (title, description, owner_id, other_client_details, preferred_skills, special_requirements, available_resources, deliverable, created, semester_id, status, max_teams, project_number, published, expiry, client_name, client_email)
VALUES
'''

for i in range(PROJECTS):
    if i == PROJECTS - 1:
        script += f'    (\'project_{i+1}\', \'project_{i+1} description\', {i+1}, NULL, NULL, NULL, NULL, NULL, \'2024-10-08\', 1, \'accepted\', {TEAMS_PER_PROJECT}, {i+1}, \'true\', \'2025-10-08\', \'john smith\', \'johnsmith@gmail.com\');\n\n'
    else:
        script += f'    (\'project_{i+1}\', \'project_{i+1} description\', {i+1}, NULL, NULL, NULL, NULL, NULL, \'2024-10-08\', 1, \'accepted\', {TEAMS_PER_PROJECT}, {i+1}, \'true\', \'2025-10-08\', \'john smith\', \'johnsmith@gmail.com\'),\n'

script += '''
INSERT INTO PREFERENCE
    (team_id, project_id, preference)
VALUES
'''

for i in range(TEAMS):
    preferences = random.sample(range(10), 5)
    for j, p in enumerate(preferences):
        if i == TEAMS - 1 and j == 4:
            script += f'    ({i+1}, {p+1}, {j+1});\n'
        else:
            script += f'    ({i+1}, {p+1}, {j+1}),\n'

script += '''
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
'''

script += '''
INSERT INTO USER  
    (role, email, password, first_name, last_name, team_id, company)
VALUES 
    ('student', 'student@gmail.com', '$2b$10$NV6/DbSVhVwXwuT2uu1vmO4IaGYKvrn6/thoHnPAgmSM/WrwZWqam', 'fname1', 'lname1', 1, NULL),
    ('admin', 'admin@gmail.com', '$2b$10$l8GwZZ3c/PB2Oq2m82RdT.jdUJXVgrvUBxTV3pxF3WzZriEWPms2.', 'fname2', 'lname2', NULL, NULL),
    ('client', 'client@gmail.com', '$2b$10$OjWuGKeyNJC/i8yQcxLHluifVPtJ4siHIp.VYRSkR5g5iWrCcbOCe', 'fname3', 'lname3', NULL, 'testcompany');
'''

with open ('src/sql/demo.sql', 'w') as f:
    f.write(script)