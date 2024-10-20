import pandas as pd

#  loading 25 teams' preferences
script = '''INSERT INTO PREFERENCE
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
    (15, 9, 3);'''

# creating one retired semester for proj. archive demo
script += '''
INSERT INTO SEMESTER 
    (start_date, end_date, start_bidding_date, end_bidding_date, is_semester_one) 
VALUES
    (STR_TO_DATE('02-26-2024','%m-%d-%Y'), STR_TO_DATE('06-24-2024','%m-%d-%Y'), ('2025-02-28 00:00:00'), ('2025-06-30 00:00:00'), true);'''

# import os
# print("Current Working Directory:", os.getcwd())

df = pd.read_csv('src/sql/demo-projects.csv')

# start query for inserting demo projects
script += '''
INSERT INTO PROJECT (title, description, owner_id, other_client_details, preferred_skills, 
special_requirements, available_resources, deliverable, created, semester_id, status, 
max_teams, project_number, published, expiry, client_name, client_email)
VALUES
'''

# Loop through each row and insert it into the table
for index, row in df.iterrows():
    row_values = (
        f'"{str(row['title']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['title']) else "NULL", 
        f'"{str(row['description']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['description']) else "NULL", 
        row['owner_id'] if not pd.isna(row['owner_id']) else "NULL", 
        f'"{str(row['other_client_details']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['other_client_details']) else "NULL", 
        f'"{str(row['preferred_skills']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['preferred_skills']) else "NULL", 
        f'"{str(row['special_requirements']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['special_requirements']) else "NULL", 
        f'"{str(row['available_resources']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['available_resources']) else "NULL", 
        f'"{str(row['deliverable']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['deliverable']) else "NULL", 
        f'"{str(row['created']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['created']) else "NULL", 
        str(row['semester_id']) if not pd.isna(row['semester_id']) else "NULL",  # Convert to str
        f'"{str(row['status']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['status']) else "NULL", 
        str(row['max_teams']) if not pd.isna(row['max_teams']) else "NULL",  # Convert to str
        str(row['project_number']) if not pd.isna(row['project_number']) else "NULL",  # Convert to str
        f'"{str(row['published']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['published']) else "NULL", 
        f'"{str(row['expiry']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['expiry']) else "NULL", 
        f'"{str(row['client_name']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['client_name']) else "NULL", 
        f'"{str(row['client_email']).replace('\\n', ' ').replace('\\r', ' ')}"'  if not pd.isna(row['client_email']) else "NULL"
    )
    
    # Append to script with a comma separator, ensure to add a newline for readability
    script += f"({', '.join(row_values)}),\n"
   
script = script.rstrip(',\n') + ';\n'

with open ('src/sql/demo-2.sql', 'w', encoding='utf-8') as f:
    f.write(script)
    
    # Append to script with a comma separator, ensure to add a newline for readability
    script += f"({', '.join(map(str, row_values))}),\n"
   

script = script.rstrip(',\n') + ';\n'

with open ('src/sql/demo-2.sql', 'w', encoding='utf-8') as f:
    f.write(script)